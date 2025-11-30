"""
Initialize database with new schema
Use this if you want to start fresh with the new database structure
"""

import os
import shutil
from datetime import datetime

def init_database():
    """Initialize database from scratch"""

    # Get database path
    db_path = os.path.join('instance', 'stycly.db')

    if os.path.exists(db_path):
        # Create backup
        backup_path = db_path + f'.backup_{datetime.now().strftime("%Y%m%d_%H%M%S")}'
        shutil.copy(db_path, backup_path)
        print(f"Backup created at: {backup_path}")

        # Remove old database
        os.remove(db_path)
        print(f"Removed old database: {db_path}")

    print("Creating new database with updated schema...")

    # Import app to trigger database creation
    from app import create_app, db

    app = create_app()

    with app.app_context():
        # Create all tables
        db.create_all()
        print("Database tables created successfully!")

        # Show created tables
        from sqlalchemy import inspect
        inspector = inspect(db.engine)
        tables = inspector.get_table_names()

        print("\nCreated tables:")
        for table in tables:
            print(f"  - {table}")

    print("\n" + "=" * 60)
    print("Database initialization complete!")
    print("You can now run the application with: python run.py")
    print("=" * 60)

if __name__ == '__main__':
    print("=" * 60)
    print("Stycly Database Initialization Script")
    print("=" * 60)
    print()
    print("WARNING: This will delete the existing database and create a new one!")
    print()

    response = input("Continue? (yes/no): ")

    if response.lower() in ['yes', 'y']:
        init_database()
    else:
        print("Initialization cancelled.")
