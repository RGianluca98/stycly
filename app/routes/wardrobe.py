"""
Wardrobe management routes for Stycly
Handles user's private wardrobe operations
"""

from flask import Blueprint, render_template, request, redirect, url_for, flash, session, jsonify
from werkzeug.utils import secure_filename
from datetime import datetime
import os
import json
from app import db
from app.models import User, WardrobeItem
from app.utils import login_required, allowed_file

wardrobe_bp = Blueprint('wardrobe', __name__, url_prefix='/wardrobe')


@wardrobe_bp.route('/')
@login_required
def index():
    """View user's wardrobe (API endpoint for AJAX)"""
    import json
    user_id = session.get('user_id')
    items = WardrobeItem.query.filter_by(user_id=user_id).order_by(WardrobeItem.created_at.desc()).all()

    items_data = []
    for item in items:
        # Parse image_paths JSON
        image_paths_list = []
        if item.image_paths:
            try:
                image_paths_list = json.loads(item.image_paths)
            except:
                pass

        items_data.append({
            'id': item.id,
            'title': item.title,
            'description': item.description,
            'destination': item.destination,
            'category': item.category,
            'size': item.size,
            'age_range': item.age_range,
            'color': item.color,
            'condition': item.condition,
            'stock': item.stock,
            'is_public_for_rent': item.is_public_for_rent,
            'image_paths': image_paths_list,
            'created_at': item.created_at.strftime('%Y-%m-%d %H:%M') if item.created_at else None,
            'updated_at': item.updated_at.strftime('%Y-%m-%d %H:%M') if item.updated_at else None
        })

    return jsonify(items_data)


@wardrobe_bp.route('/add', methods=['POST'])
@login_required
def add_item():
    """Add new item to wardrobe"""
    user_id = session.get('user_id')

    # Get form data
    title = request.form.get('title', '').strip()
    description = request.form.get('description', '').strip()
    destination = request.form.get('destination', '').strip()
    category = request.form.get('category', '').strip()
    size = request.form.get('size', '').strip()
    age_range = request.form.get('age_range', '').strip()
    color = request.form.get('color', '').strip()
    condition = request.form.get('condition', '').strip()
    stock = request.form.get('stock', '1')
    is_public = request.form.get('is_public') == 'on'

    # Validation
    errors = []

    if not title:
        errors.append('Il titolo è obbligatorio.')

    try:
        stock = int(stock)
        if stock < 0:
            errors.append('La quantità deve essere positiva.')
    except ValueError:
        errors.append('Valore quantità non valido.')
        stock = 1

    # Handle multiple image uploads
    import json
    image_paths = []

    # Get all uploaded files
    uploaded_files = request.files.getlist('images')

    for file in uploaded_files:
        if file and file.filename and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            # Add timestamp to avoid collisions
            timestamp = datetime.utcnow().strftime('%Y%m%d_%H%M%S_%f')
            filename = f"{timestamp}_{filename}"

            from flask import current_app
            filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            image_paths.append(f'uploads/{filename}')

    if errors:
        for error in errors:
            flash(error, 'danger')
        return redirect(url_for('main.index') + '#wardrobe')

    # Create new wardrobe item
    item = WardrobeItem(
        user_id=user_id,
        title=title,
        description=description,
        destination=destination,
        category=category,
        size=size,
        age_range=age_range,
        color=color,
        condition=condition,
        stock=stock,
        image_paths=json.dumps(image_paths) if image_paths else None,
        is_public_for_rent=is_public
    )

    try:
        db.session.add(item)

        # Update user's last_item_insert_at
        user = User.query.get(user_id)
        user.last_item_insert_at = datetime.utcnow()

        db.session.commit()
        flash('Articolo aggiunto al guardaroba con successo!', 'success')

    except Exception as e:
        db.session.rollback()
        flash('Si è verificato un errore durante l\'aggiunta dell\'articolo.', 'danger')

    return redirect(url_for('main.index') + '#wardrobe')


@wardrobe_bp.route('/edit/<int:item_id>', methods=['POST'])
@login_required
def edit_item(item_id):
    """Edit wardrobe item"""
    user_id = session.get('user_id')
    item = WardrobeItem.query.filter_by(id=item_id, user_id=user_id).first()

    if not item:
        flash('Articolo non trovato.', 'danger')
        return redirect(url_for('main.index') + '#wardrobe')

    # Update fields
    item.title = request.form.get('title', '').strip()
    item.description = request.form.get('description', '').strip()
    item.destination = request.form.get('destination', '').strip()
    item.category = request.form.get('category', '').strip()
    item.size = request.form.get('size', '').strip()
    item.age_range = request.form.get('age_range', '').strip()
    item.color = request.form.get('color', '').strip()
    item.condition = request.form.get('condition', '').strip()

    try:
        item.stock = int(request.form.get('stock', 1))
    except ValueError:
        item.stock = 1

    item.is_public_for_rent = request.form.get('is_public') == 'on'
    item.updated_at = datetime.utcnow()

    # Handle multiple image uploads if provided
    import json
    uploaded_files = request.files.getlist('images')

    if uploaded_files and any(f.filename for f in uploaded_files):
        image_paths = []
        for file in uploaded_files:
            if file and file.filename and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                timestamp = datetime.utcnow().strftime('%Y%m%d_%H%M%S_%f')
                filename = f"{timestamp}_{filename}"

                from flask import current_app
                filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
                file.save(filepath)
                image_paths.append(f'uploads/{filename}')

        if image_paths:
            item.image_paths = json.dumps(image_paths)

    try:
        db.session.commit()
        flash('Articolo aggiornato con successo!', 'success')
    except Exception as e:
        db.session.rollback()
        flash('Si è verificato un errore durante l\'aggiornamento dell\'articolo.', 'danger')

    return redirect(url_for('main.index') + '#wardrobe')


@wardrobe_bp.route('/delete/<int:item_id>', methods=['POST'])
@login_required
def delete_item(item_id):
    """Delete wardrobe item"""
    user_id = session.get('user_id')
    item = WardrobeItem.query.filter_by(id=item_id, user_id=user_id).first()
    
    if not item:
        flash('Articolo non trovato.', 'danger')
        return redirect(url_for('main.index') + '#wardrobe')
    
    try:
        db.session.delete(item)
        db.session.commit()
        flash('Articolo eliminato con successo.', 'success')
    except Exception as e:
        db.session.rollback()
        flash('Si è verificato un errore durante l\'eliminazione dell\'articolo.', 'danger')
    
    return redirect(url_for('main.index') + '#wardrobe')


@wardrobe_bp.route('/delete-all', methods=['POST'])
@login_required
def delete_wardrobe():
    """Delete all user's wardrobe items"""
    user_id = session.get('user_id')
    
    try:
        WardrobeItem.query.filter_by(user_id=user_id).delete()
        
        # Reset last_item_insert_at
        user = User.query.get(user_id)
        user.last_item_insert_at = None
        
        db.session.commit()
        flash('Tutti gli articoli del guardaroba sono stati eliminati con successo.', 'success')
    except Exception as e:
        db.session.rollback()
        flash('Si è verificato un errore durante l\'eliminazione del guardaroba.', 'danger')
    
    return redirect(url_for('main.index') + '#wardrobe')


@wardrobe_bp.route('/delete-account', methods=['POST'])
@login_required
def delete_account():
    """Delete user account and all associated data"""
    user_id = session.get('user_id')
    
    try:
        user = User.query.get(user_id)
        
        # SQLAlchemy cascade will handle deletion of wardrobe items and orders
        db.session.delete(user)
        db.session.commit()
        
        # Clear session
        session.clear()

        flash('Il tuo account è stato eliminato con successo.', 'info')
        return redirect(url_for('main.index'))

    except Exception as e:
        db.session.rollback()
        flash('Si è verificato un errore durante l\'eliminazione del tuo account.', 'danger')
        return redirect(url_for('main.index') + '#wardrobe')
