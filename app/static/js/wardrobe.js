// Wardrobe management functionality

document.addEventListener('DOMContentLoaded', function() {
    loadWardrobeItems();
});

function loadWardrobeItems() {
    fetch('/wardrobe/')
        .then(res => res.json())
        .then(items => {
            displayWardrobeItems(items);
        })
        .catch(err => {
            console.error('Error loading wardrobe items:', err);
            document.getElementById('wardrobeItems').innerHTML =
                '<p class="no-items">Errore nel caricamento degli articoli. Riprova.</p>';
        });
}

function displayWardrobeItems(items) {
    const container = document.getElementById('wardrobeItems');

    // Store items data globally for gallery navigation
    wardrobeItemsData = items;

    if (!items || items.length === 0) {
        container.innerHTML = '<p class="no-items">Non hai ancora aggiunto articoli. Clicca su "Aggiungi Nuovo Articolo" per iniziare!</p>';
        return;
    }

    let html = '';
    items.forEach(item => {
        const firstImage = item.image_paths && item.image_paths.length > 0
            ? `/static/${item.image_paths[0]}`
            : 'https://via.placeholder.com/300x300?text=No+Image';

        const badges = [];
        if (item.destination) badges.push(`<span class="badge badge-destination">${item.destination}</span>`);
        if (item.condition) badges.push(`<span class="badge badge-condition">${item.condition}</span>`);
        if (item.stock !== undefined) {
            const stockClass = item.stock === 0 ? 'out' : (item.stock <= 3 ? 'low' : '');
            badges.push(`<span class="badge badge-stock ${stockClass}">Disponibilità: ${item.stock}</span>`);
        }
        if (item.is_public_for_rent) {
            badges.push(`<span class="badge" style="background: #28a745; color: white;">Pubblico</span>`);
        } else {
            badges.push(`<span class="badge" style="background: #6c757d; color: white;">Privato</span>`);
        }

        html += `
            <div class="wardrobe-item-card">
                <div class="wardrobe-item-images">
                    ${renderImageGallery(item)}
                </div>
                <div class="wardrobe-item-info">
                    <div class="wardrobe-item-badges">
                        ${badges.join('')}
                    </div>
                    <h3 style="margin: 0.75rem 0 0.5rem; font-size: 1.2rem;">${escapeHtml(item.title)}</h3>
                    ${item.description ? `<p style="font-size: 0.9rem; color: #666; margin-bottom: 0.75rem;">${escapeHtml(item.description)}</p>` : ''}

                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; margin-bottom: 1rem; font-size: 0.85rem;">
                        ${item.category ? `<div><strong>Categoria:</strong> ${escapeHtml(item.category)}</div>` : ''}
                        ${item.size ? `<div><strong>Taglia:</strong> ${escapeHtml(item.size)}</div>` : ''}
                        ${item.color ? `<div><strong>Colore:</strong> ${escapeHtml(item.color)}</div>` : ''}
                    </div>

                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        <button class="btn btn-accent btn-small" onclick="showEditModal(${item.id})">
                            <i class="fas fa-edit"></i> Modifica
                        </button>
                        <button class="btn btn-secondary btn-small" onclick="deleteItem(${item.id})">
                            <i class="fas fa-trash"></i> Elimina
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function renderImageGallery(item) {
    if (!item.image_paths || item.image_paths.length === 0) {
        return `<img src="https://via.placeholder.com/300x300?text=No+Image" alt="No image">`;
    }

    if (item.image_paths.length === 1) {
        return `<img src="/static/${item.image_paths[0]}" alt="${escapeHtml(item.title)}">`;
    }

    // Multiple images - show first with gallery indicators
    return `
        <div class="wardrobe-item-gallery" data-item-id="${item.id}">
            <img src="/static/${item.image_paths[0]}" alt="${escapeHtml(item.title)}" id="gallery-img-${item.id}">
            <div class="gallery-indicators">
                ${item.image_paths.map((_, index) =>
                    `<span class="gallery-indicator ${index === 0 ? 'active' : ''}"
                          onclick="changeGalleryImage(${item.id}, ${index})"></span>`
                ).join('')}
            </div>
        </div>
    `;
}

// Store all items data globally for gallery navigation
let wardrobeItemsData = [];

function changeGalleryImage(itemId, imageIndex) {
    const item = wardrobeItemsData.find(i => i.id === itemId);
    if (!item || !item.image_paths || imageIndex >= item.image_paths.length) {
        return;
    }

    // Update image
    const imgElement = document.getElementById(`gallery-img-${itemId}`);
    if (imgElement) {
        imgElement.src = `/static/${item.image_paths[imageIndex]}`;
    }

    // Update indicators
    const gallery = document.querySelector(`[data-item-id="${itemId}"]`);
    if (gallery) {
        const indicators = gallery.querySelectorAll('.gallery-indicator');
        indicators.forEach((indicator, idx) => {
            if (idx === imageIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showEditModal(itemId) {
    // Fetch item data
    fetch('/wardrobe/')
        .then(res => res.json())
        .then(items => {
            const item = items.find(i => i.id === itemId);
            if (!item) {
                alert('Articolo non trovato');
                return;
            }
            openEditModal(item);
        })
        .catch(err => {
            console.error('Error loading item:', err);
            alert('Errore nel caricamento dei dettagli dell\'articolo');
        });
}

function openEditModal(item) {
    // Create modal HTML
    const modalHtml = `
        <div class="modal show" id="editModal" onclick="closeEditModal(event)">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2>Modifica Articolo</h2>
                    <button class="modal-close" onclick="closeEditModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="editItemForm" method="POST" action="/wardrobe/edit/${item.id}" enctype="multipart/form-data">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="edit_title">Titolo *</label>
                                <input type="text" id="edit_title" name="title" value="${escapeHtml(item.title)}" required>
                            </div>

                            <div class="form-group">
                                <label for="edit_destination">Destinazione *</label>
                                <select id="edit_destination" name="destination" required>
                                    <option value="">Seleziona Destinazione</option>
                                    <option value="Bambino" ${item.destination === 'Bambino' ? 'selected' : ''}>Bambino</option>
                                    <option value="Bambina" ${item.destination === 'Bambina' ? 'selected' : ''}>Bambina</option>
                                    <option value="Stycly props" ${item.destination === 'Stycly props' ? 'selected' : ''}>Stycly Props</option>
                                    <option value="Stycly accessories" ${item.destination === 'Stycly accessories' ? 'selected' : ''}>Stycly Accessories</option>
                                    <option value="Stycly Vintage" ${item.destination === 'Stycly Vintage' ? 'selected' : ''}>Stycly Vintage</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="edit_category">Categoria *</label>
                                <input type="text" id="edit_category" name="category" value="${escapeHtml(item.category || '')}" required>
                            </div>

                            <div class="form-group">
                                <label for="edit_size">Taglia</label>
                                <input type="text" id="edit_size" name="size" value="${escapeHtml(item.size || '')}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="edit_description">Descrizione</label>
                            <textarea id="edit_description" name="description" rows="3">${escapeHtml(item.description || '')}</textarea>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="edit_color">Colore</label>
                                <input type="text" id="edit_color" name="color" value="${escapeHtml(item.color || '')}">
                            </div>

                            <div class="form-group">
                                <label for="edit_condition">Condizione *</label>
                                <select id="edit_condition" name="condition" required>
                                    <option value="">Seleziona Condizione</option>
                                    <option value="New with Tags" ${item.condition === 'New with Tags' ? 'selected' : ''}>New with Tags</option>
                                    <option value="New without Tags" ${item.condition === 'New without Tags' ? 'selected' : ''}>New without Tags</option>
                                    <option value="Like New" ${item.condition === 'Like New' ? 'selected' : ''}>Like New</option>
                                    <option value="Excellent" ${item.condition === 'Excellent' ? 'selected' : ''}>Excellent</option>
                                    <option value="Very Good" ${item.condition === 'Very Good' ? 'selected' : ''}>Very Good</option>
                                    <option value="Good" ${item.condition === 'Good' ? 'selected' : ''}>Good</option>
                                    <option value="Fair" ${item.condition === 'Fair' ? 'selected' : ''}>Fair</option>
                                    <option value="Vintage" ${item.condition === 'Vintage' ? 'selected' : ''}>Vintage</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="edit_stock">Quantità Disponibile</label>
                                <input type="number" id="edit_stock" name="stock" min="1" value="${item.stock || 1}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="edit_images">Aggiorna Immagini (Multiplo consentito)</label>
                            <input type="file" id="edit_images" name="images" accept="image/*" multiple>
                            <small class="form-help">Seleziona nuove immagini per sostituire quelle esistenti</small>
                            ${item.image_paths && item.image_paths.length > 0 ? `
                                <div style="margin-top: 0.5rem;">
                                    <strong>Immagini attuali:</strong> ${item.image_paths.length}
                                </div>
                            ` : ''}
                        </div>

                        <div class="form-group checkbox-group">
                            <label>
                                <input type="checkbox" name="is_public" ${item.is_public_for_rent ? 'checked' : ''}>
                                <span>Rendi pubblicamente disponibile per il noleggio</span>
                            </label>
                        </div>

                        <div class="modal-footer">
                            <button type="submit" class="btn btn-accent">Salva Modifiche</button>
                            <button type="button" class="btn btn-secondary" onclick="closeEditModal()">Annulla</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if any
    const existingModal = document.getElementById('editModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function closeEditModal(event) {
    if (event && event.target !== event.currentTarget) return;

    const modal = document.getElementById('editModal');
    if (modal) {
        modal.remove();
    }
}

function deleteItem(itemId) {
    if (confirm('Sei sicuro di voler eliminare questo articolo?')) {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `/wardrobe/delete/${itemId}`;
        document.body.appendChild(form);
        form.submit();
    }
}
