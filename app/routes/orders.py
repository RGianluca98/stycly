"""
Order routes for Stycly
Handles rental requests and order processing
"""

from flask import Blueprint, render_template, request, redirect, url_for, flash, session
from datetime import datetime
from app import db
from app.models import Order, OrderItem, WardrobeItem
from app.utils import send_order_confirmation_email, send_order_notification_email

orders_bp = Blueprint('orders', __name__, url_prefix='/orders')


@orders_bp.route('/submit', methods=['POST'])
def submit_order():
    """Submit rental request"""
    
    # Get cart
    cart = session.get('cart', {})
    
    if not cart:
        flash('Il tuo carrello è vuoto.', 'warning')
        return redirect(url_for('main.index') + '#products')
    
    # Get form data
    name = request.form.get('name', '').strip()
    email = request.form.get('email', '').strip()
    phone = request.form.get('phone', '').strip()
    start_date_str = request.form.get('start_date', '')
    end_date_str = request.form.get('end_date', '')
    notes = request.form.get('notes', '').strip()
    privacy_accepted = request.form.get('privacy') == 'on'
    
    # Validation
    errors = []
    
    if not name:
        errors.append('Il nome completo è obbligatorio.')

    if not email or '@' not in email:
        errors.append('È richiesta un\'email valida.')

    if not privacy_accepted:
        errors.append('Devi accettare la privacy policy e i termini.')
    
    # Parse dates
    try:
        start_date = datetime.strptime(start_date_str, '%Y-%m-%d').date()
        end_date = datetime.strptime(end_date_str, '%Y-%m-%d').date()
        
        if start_date < datetime.utcnow().date():
            errors.append('La data di inizio non può essere nel passato.')

        if end_date < start_date:
            errors.append('La data di fine deve essere successiva alla data di inizio.')

    except ValueError:
        errors.append('Date non valide.')
        start_date = None
        end_date = None
    
    if errors:
        for error in errors:
            flash(error, 'danger')
        return redirect(url_for('main.index') + '#rental-request')
    
    # Create order
    try:
        # Get user_id if logged in
        user_id = session.get('user_id')
        
        order = Order(
            user_id=user_id,
            name=name,
            email=email,
            phone=phone,
            start_date=start_date,
            end_date=end_date,
            notes=notes,
            status='pending'
        )
        
        db.session.add(order)
        db.session.flush()  # Get order ID
        
        # Add order items
        for item_id_str, quantity in cart.items():
            item = WardrobeItem.query.get(int(item_id_str))
            if item:
                order_item = OrderItem(
                    order_id=order.id,
                    wardrobe_item_id=item.id,
                    quantity=quantity,
                    daily_price=item.daily_price
                )
                db.session.add(order_item)
        
        db.session.commit()
        
        # Send emails
        send_order_confirmation_email(order)
        send_order_notification_email(order)
        
        # Clear cart
        session['cart'] = {}
        session.modified = True
        
        flash('Grazie! La tua richiesta di noleggio è stata inviata. Ti contatteremo presto con un preventivo.', 'success')
        return redirect(url_for('orders.confirmation', order_id=order.id))

    except Exception as e:
        db.session.rollback()
        flash('Si è verificato un errore durante l\'elaborazione della richiesta. Riprova.', 'danger')
        return redirect(url_for('main.index') + '#rental-request')


@orders_bp.route('/confirmation/<int:order_id>')
def confirmation(order_id):
    """Order confirmation page"""
    order = Order.query.get_or_404(order_id)
    
    # Check if user has access to this order
    user_id = session.get('user_id')
    if order.user_id and order.user_id != user_id:
        # Only allow viewing if it's the user's order or a guest order
        flash('Ordine non trovato.', 'danger')
        return redirect(url_for('main.index'))
    
    return render_template('order_confirmation.html', order=order)
