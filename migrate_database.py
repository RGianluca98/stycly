"""
Database migration script to update WardrobeItem table
Adds new fields: destination, condition, image_paths
Removes: daily_price field
Changes: image_path -> image_paths
"""

import sqlite3
import json
import os

def migrate_database():
    """Migrate the database to the new schema"""

    # Get database path
    db_path = os.path.join('instance', 'stycly.db')

    if not os.path.exists(db_path):
        print(f"Database not found at {db_path}")
        print("No migration needed - database will be created with new schema on first run")
        return

    print(f"Starting database migration for {db_path}")

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    try:
        # Check if migration is needed
        cursor.execute("PRAGMA table_info(wardrobe_items)")
        columns = {col[1]: col for col in cursor.fetchall()}

        # Check if destination column exists
        if 'destination' in columns:
            print("Migration already completed. Skipping.")
            return

        print("Creating backup of wardrobe_items table...")

        # Create backup table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS wardrobe_items_backup AS
            SELECT * FROM wardrobe_items
        """)

        print("Creating new wardrobe_items table with updated schema...")

        # Drop the old table
        cursor.execute("DROP TABLE wardrobe_items")

        # Create new table with updated schema
        cursor.execute("""
            CREATE TABLE wardrobe_items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                title VARCHAR(200) NOT NULL,
                description TEXT,
                destination VARCHAR(50),
                category VARCHAR(50),
                size VARCHAR(20),
                age_range VARCHAR(50),
                color VARCHAR(50),
                condition VARCHAR(50),
                image_paths TEXT,
                stock INTEGER DEFAULT 1,
                is_public_for_rent BOOLEAN DEFAULT 1,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        """)

        print("Migrating existing data...")

        # Migrate data from backup to new table
        cursor.execute("""
            INSERT INTO wardrobe_items
            (id, user_id, title, description, category, size, age_range, color,
             stock, is_public_for_rent, created_at, updated_at)
            SELECT
                id, user_id, title, description, category, size, age_range, color,
                stock, is_public_for_rent, created_at, updated_at
            FROM wardrobe_items_backup
        """)

        # Convert old image_path to new image_paths (JSON array)
        cursor.execute("SELECT id, image_path FROM wardrobe_items_backup WHERE image_path IS NOT NULL")
        old_images = cursor.fetchall()

        for item_id, image_path in old_images:
            # Convert single path to JSON array
            image_paths_json = json.dumps([image_path])
            cursor.execute(
                "UPDATE wardrobe_items SET image_paths = ? WHERE id = ?",
                (image_paths_json, item_id)
            )

        print(f"Migrated {len(old_images)} item images")

        # Update OrderItem table to remove daily_price
        print("Updating order_items table...")

        cursor.execute("PRAGMA table_info(order_items)")
        order_columns = {col[1]: col for col in cursor.fetchall()}

        if 'daily_price' in order_columns:
            # Create backup
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS order_items_backup AS
                SELECT * FROM order_items
            """)

            # Drop and recreate
            cursor.execute("DROP TABLE order_items")

            cursor.execute("""
                CREATE TABLE order_items (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    order_id INTEGER NOT NULL,
                    wardrobe_item_id INTEGER NOT NULL,
                    quantity INTEGER NOT NULL DEFAULT 1,
                    FOREIGN KEY (order_id) REFERENCES orders(id),
                    FOREIGN KEY (wardrobe_item_id) REFERENCES wardrobe_items(id)
                )
            """)

            # Migrate data
            cursor.execute("""
                INSERT INTO order_items (id, order_id, wardrobe_item_id, quantity)
                SELECT id, order_id, wardrobe_item_id, quantity
                FROM order_items_backup
            """)

            print("Updated order_items table")

        conn.commit()
        print("Migration completed successfully!")

        # Show statistics
        cursor.execute("SELECT COUNT(*) FROM wardrobe_items")
        count = cursor.fetchone()[0]
        print(f"Total wardrobe items: {count}")

    except Exception as e:
        print(f"Error during migration: {e}")
        conn.rollback()
        raise

    finally:
        conn.close()

if __name__ == '__main__':
    print("=" * 60)
    print("Stycly Database Migration Script")
    print("=" * 60)
    print()

    response = input("This will modify your database. Continue? (yes/no): ")

    if response.lower() in ['yes', 'y']:
        migrate_database()
        print()
        print("=" * 60)
        print("Migration complete! You can now run the application.")
        print("=" * 60)
    else:
        print("Migration cancelled.")
