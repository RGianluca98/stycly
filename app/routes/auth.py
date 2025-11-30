"""
Authentication routes for Stycly
Handles login, registration, logout, and password reset
"""

from flask import Blueprint, render_template, request, redirect, url_for, flash, session
from datetime import datetime, timedelta
from app import db
from app.models import User, PasswordResetToken
from app.utils import send_password_reset_email
import secrets

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')


@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    """User registration"""
    if request.method == 'POST':
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip().lower()
        password = request.form.get('password', '')
        confirm_password = request.form.get('confirm_password', '')
        
        # Validation
        errors = []
        
        if not name or len(name) < 2:
            errors.append('Il nome deve contenere almeno 2 caratteri.')

        if not email or '@' not in email:
            errors.append('Fornisci un indirizzo email valido.')

        if not password or len(password) < 8:
            errors.append('La password deve contenere almeno 8 caratteri.')

        if password != confirm_password:
            errors.append('Le password non corrispondono.')

        # Check if email already exists
        if User.query.filter_by(email=email).first():
            errors.append('Questa email è già registrata.')
        
        if errors:
            for error in errors:
                flash(error, 'danger')
            return render_template('register.html', name=name, email=email)
        
        # Create new user
        user = User(name=name, email=email)
        user.set_password(password)
        
        try:
            db.session.add(user)
            db.session.commit()
            
            flash('Registrazione completata con successo! Effettua il login.', 'success')
            return redirect(url_for('auth.login'))

        except Exception as e:
            db.session.rollback()
            flash('Si è verificato un errore durante la registrazione. Riprova.', 'danger')
            return render_template('register.html', name=name, email=email)
    
    return render_template('register.html')


@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    """User login"""
    if request.method == 'POST':
        email = request.form.get('email', '').strip().lower()
        password = request.form.get('password', '')
        remember = request.form.get('remember') == 'on'
        
        user = User.query.filter_by(email=email).first()
        
        if user and user.check_password(password) and user.is_active:
            # Set session
            session['user_id'] = user.id
            session['user_name'] = user.name
            session['user_email'] = user.email
            
            # Update last login
            user.last_login_at = datetime.utcnow()
            db.session.commit()
            
            # Set session to permanent if remember me is checked
            if remember:
                session.permanent = True
            
            flash(f'Bentornato, {user.name}!', 'success')

            # Redirect to next page or home
            next_page = request.args.get('next')
            if next_page and next_page.startswith('/'):
                return redirect(next_page)
            return redirect(url_for('main.index'))

        else:
            flash('Email o password non validi.', 'danger')
    
    return render_template('login.html')


@auth_bp.route('/logout')
def logout():
    """User logout"""
    session.clear()
    flash('Logout effettuato con successo.', 'info')
    return redirect(url_for('main.index'))


@auth_bp.route('/forgot-password', methods=['GET', 'POST'])
def forgot_password():
    """Request password reset"""
    if request.method == 'POST':
        email = request.form.get('email', '').strip().lower()
        user = User.query.filter_by(email=email).first()
        
        if user:
            # Generate secure token
            token = secrets.token_urlsafe(32)
            
            # Create reset token record
            reset_token = PasswordResetToken(
                user_id=user.id,
                token=token,
                expires_at=datetime.utcnow() + timedelta(hours=1)
            )
            
            db.session.add(reset_token)
            db.session.commit()
            
            # Send reset email
            reset_url = url_for('auth.reset_password', token=token, _external=True)
            send_password_reset_email(user, reset_url)
        
        # Always show success message (don't reveal if email exists)
        flash('Se questa email è registrata, riceverai a breve un link per reimpostare la password.', 'info')
        return redirect(url_for('auth.login'))
    
    return render_template('forgot_password.html')


@auth_bp.route('/reset-password/<token>', methods=['GET', 'POST'])
def reset_password(token):
    """Reset password with token"""
    reset_token = PasswordResetToken.query.filter_by(token=token).first()
    
    if not reset_token or not reset_token.is_valid():
        flash('Link di reimpostazione password non valido o scaduto.', 'danger')
        return redirect(url_for('auth.forgot_password'))
    
    if request.method == 'POST':
        password = request.form.get('password', '')
        confirm_password = request.form.get('confirm_password', '')
        
        if not password or len(password) < 8:
            flash('La password deve contenere almeno 8 caratteri.', 'danger')
            return render_template('reset_password.html', token=token)

        if password != confirm_password:
            flash('Le password non corrispondono.', 'danger')
            return render_template('reset_password.html', token=token)
        
        # Update password
        user = reset_token.user
        user.set_password(password)
        
        # Mark token as used
        reset_token.used = True
        
        db.session.commit()

        flash('La tua password è stata reimpostata con successo. Effettua il login.', 'success')
        return redirect(url_for('auth.login'))
    
    return render_template('reset_password.html', token=token)
