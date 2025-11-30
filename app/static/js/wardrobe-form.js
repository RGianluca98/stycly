// Wardrobe form dynamic fields configuration

// Categories based on destination
const CATEGORIES_BY_DESTINATION = {
    'Bambino': [
        'Camicie', 'T-shirt', 'Maglioni', 'Giacche', 'Cappotti',
        'Pantaloni', 'Jeans', 'Pantaloncini', 'Completi', 'Abbigliamento formale',
        'Scarpe', 'Sneakers', 'Stivali', 'Sandali',
        'Calzini', 'Intimo', 'Pigiami',
        'Accessori', 'Cappelli', 'Berretti', 'Cinture', 'Cravatte', 'Papillon',
        'Occhiali da sole', 'Orologi', 'Zaini', 'Borse',
        'Giocattoli', 'Giochi', 'Attrezzatura sportiva'
    ],
    'Bambina': [
        'Vestiti', 'Gonne', 'Camicette', 'T-shirt', 'Maglioni', 'Cardigan',
        'Giacche', 'Cappotti', 'Pantaloni', 'Jeans', 'Leggings', 'Pantaloncini',
        'Abbigliamento formale', 'Vestiti da festa', 'Vestiti da comunione',
        'Scarpe', 'Sandali', 'Ballerine', 'Stivali', 'Sneakers',
        'Calzini', 'Collant', 'Intimo', 'Pigiami', 'Camicie da notte',
        'Accessori', 'Accessori per capelli', 'Cerchietti', 'Fermagli',
        'Gioielli', 'Collane', 'Braccialetti', 'Anelli',
        'Borse', 'Borsette', 'Zaini',
        'Occhiali da sole', 'Cappelli', 'Sciarpe', 'Guanti',
        'Giocattoli', 'Bambole', 'Giochi'
    ],
    'Stycly props': [
        'Props fotografici', 'Fondali', 'Fondali in tessuto', 'Fondali in carta',
        'Mobili', 'Sedie', 'Sgabelli', 'Panche', 'Tavoli',
        'Oggetti decorativi', 'Vasi', 'Cornici', 'Candele',
        'Decorazioni stagionali', 'Natale', 'Halloween', 'Pasqua', 'Compleanno',
        'Illuminazione', 'Luci da studio', 'Luci decorative', 'Lampade',
        'Tessuti', 'Coperte', 'Cuscini', 'Tappeti', 'Tende',
        'Insegne', 'Lavagne lettere', 'Insegne neon', 'Insegne legno',
        'Piante', 'Fiori artificiali', 'Verde decorativo',
        'Palloncini', 'Striscioni', 'Ghirlande'
    ],
    'Stycly accessories': [
        'Gioielli', 'Collane', 'Braccialetti', 'Anelli', 'Orecchini',
        'Accessori per capelli', 'Cerchietti', 'Fermagli', 'Fiocchi', 'Corone', 'Diademi',
        'Borse', 'Borsette', 'Pochette', 'Zaini', 'Borse shopping',
        'Cinture', 'Bretelle', 'Papillon', 'Cravatte', 'Fazzoletti da taschino',
        'Cappelli', 'Berretti', 'Basco', 'Cuffie', 'Cappelli da sole',
        'Sciarpe', 'Scialli', 'Stole',
        'Guanti', 'Muffole',
        'Occhiali da sole', 'Occhiali',
        'Orologi', 'Bracciali',
        'Calzini', 'Collant', 'Scaldamuscoli',
        'Ombrelli', 'Ventagli'
    ],
    'Stycly Vintage': [
        'Vestiti vintage', 'Completi vintage', 'Cappotti vintage',
        'Camicie vintage', 'Camicette vintage', 'Gonne vintage',
        'Pantaloni vintage', 'Jeans vintage',
        'Scarpe vintage', 'Stivali vintage', 'Sneakers vintage',
        'Accessori vintage', 'Borse vintage', 'Gioielli vintage',
        'Cappelli vintage', 'Sciarpe vintage',
        'Giocattoli vintage', 'Giochi vintage',
        'Mobili vintage', 'Decorazioni vintage',
        'Oggetti antichi', 'Abbigliamento retrò', 'Vintage firmato'
    ]
};

// Sizes based on category
const SIZES_BY_CATEGORY = {
    // Clothing sizes (tradotte in italiano)
    'Camicie': ['XS (2-3A)', 'S (4-5A)', 'M (6-7A)', 'L (8-9A)', 'XL (10-12A)', 'XXL (13-14A)'],
    'T-shirt': ['XS (2-3A)', 'S (4-5A)', 'M (6-7A)', 'L (8-9A)', 'XL (10-12A)', 'XXL (13-14A)'],
    'Maglioni': ['XS (2-3A)', 'S (4-5A)', 'M (6-7A)', 'L (8-9A)', 'XL (10-12A)', 'XXL (13-14A)'],
    'Cardigan': ['XS (2-3A)', 'S (4-5A)', 'M (6-7A)', 'L (8-9A)', 'XL (10-12A)', 'XXL (13-14A)'],
    'Giacche': ['XS (2-3A)', 'S (4-5A)', 'M (6-7A)', 'L (8-9A)', 'XL (10-12A)', 'XXL (13-14A)'],
    'Cappotti': ['XS (2-3A)', 'S (4-5A)', 'M (6-7A)', 'L (8-9A)', 'XL (10-12A)', 'XXL (13-14A)'],
    'Vestiti': ['XS (2-3A)', 'S (4-5A)', 'M (6-7A)', 'L (8-9A)', 'XL (10-12A)', 'XXL (13-14A)'],
    'Gonne': ['XS (2-3A)', 'S (4-5A)', 'M (6-7A)', 'L (8-9A)', 'XL (10-12A)', 'XXL (13-14A)'],
    'Camicette': ['XS (2-3A)', 'S (4-5A)', 'M (6-7A)', 'L (8-9A)', 'XL (10-12A)', 'XXL (13-14A)'],
    'Pantaloni': ['XS (2-3A)', 'S (4-5A)', 'M (6-7A)', 'L (8-9A)', 'XL (10-12A)', 'XXL (13-14A)'],
    'Jeans': ['XS (2-3A)', 'S (4-5A)', 'M (6-7A)', 'L (8-9A)', 'XL (10-12A)', 'XXL (13-14A)'],
    'Pantaloncini': ['XS (2-3A)', 'S (4-5A)', 'M (6-7A)', 'L (8-9A)', 'XL (10-12A)', 'XXL (13-14A)'],
    'Leggings': ['XS (2-3A)', 'S (4-5A)', 'M (6-7A)', 'L (8-9A)', 'XL (10-12A)', 'XXL (13-14A)'],
    'Completi': ['XS (2-3A)', 'S (4-5A)', 'M (6-7A)', 'L (8-9A)', 'XL (10-12A)', 'XXL (13-14A)'],
    'Abbigliamento formale': ['XS (2-3A)', 'S (4-5A)', 'M (6-7A)', 'L (8-9A)', 'XL (10-12A)', 'XXL (13-14A)'],
    'Vestiti da festa': ['XS (2-3A)', 'S (4-5A)', 'M (6-7A)', 'L (8-9A)', 'XL (10-12A)', 'XXL (13-14A)'],
    'Vestiti da comunione': ['XS (2-3A)', 'S (4-5A)', 'M (6-7A)', 'L (8-9A)', 'XL (10-12A)', 'XXL (13-14A)'],
    'Pigiami': ['XS (2-3A)', 'S (4-5A)', 'M (6-7A)', 'L (8-9A)', 'XL (10-12A)', 'XXL (13-14A)'],
    'Camicie da notte': ['XS (2-3A)', 'S (4-5A)', 'M (6-7A)', 'L (8-9A)', 'XL (10-12A)', 'XXL (13-14A)'],
    'Intimo': ['2-3A', '4-5A', '6-7A', '8-9A', '10-12A', '13-14A'],
    'Vestiti vintage': ['XS (2-3A)', 'S (4-5A)', 'M (6-7A)', 'L (8-9A)', 'XL (10-12A)', 'XXL (13-14A)'],
    'Completi vintage': ['XS (2-3A)', 'S (4-5A)', 'M (6-7A)', 'L (8-9A)', 'XL (10-12A)', 'XXL (13-14A)'],
    'Cappotti vintage': ['XS (2-3A)', 'S (4-5A)', 'M (6-7A)', 'L (8-9A)', 'XL (10-12A)', 'XXL (13-14A)'],
    'Camicie vintage': ['XS (2-3A)', 'S (4-5A)', 'M (6-7A)', 'L (8-9A)', 'XL (10-12A)', 'XXL (13-14A)'],
    'Camicette vintage': ['XS (2-3A)', 'S (4-5A)', 'M (6-7A)', 'L (8-9A)', 'XL (10-12A)', 'XXL (13-14A)'],
    'Gonne vintage': ['XS (2-3A)', 'S (4-5A)', 'M (6-7A)', 'L (8-9A)', 'XL (10-12A)', 'XXL (13-14A)'],
    'Pantaloni vintage': ['XS (2-3A)', 'S (4-5A)', 'M (6-7A)', 'L (8-9A)', 'XL (10-12A)', 'XXL (13-14A)'],
    'Jeans vintage': ['XS (2-3A)', 'S (4-5A)', 'M (6-7A)', 'L (8-9A)', 'XL (10-12A)', 'XXL (13-14A)'],

    // Shoe sizes (EU sizes with cm) - tradotte
    'Scarpe': ['18 (10.5cm)', '19 (11cm)', '20 (11.5cm)', '21 (12cm)', '22 (12.5cm)', '23 (13.5cm)', '24 (14cm)', '25 (14.5cm)', '26 (15cm)', '27 (15.5cm)', '28 (16cm)', '29 (16.5cm)', '30 (17.5cm)', '31 (18cm)', '32 (18.5cm)', '33 (19.5cm)', '34 (20cm)', '35 (20.5cm)', '36 (21.5cm)', '37 (22cm)', '38 (22.5cm)', '39 (23.5cm)', '40 (24cm)'],
    'Sneakers': ['18 (10.5cm)', '19 (11cm)', '20 (11.5cm)', '21 (12cm)', '22 (12.5cm)', '23 (13.5cm)', '24 (14cm)', '25 (14.5cm)', '26 (15cm)', '27 (15.5cm)', '28 (16cm)', '29 (16.5cm)', '30 (17.5cm)', '31 (18cm)', '32 (18.5cm)', '33 (19.5cm)', '34 (20cm)', '35 (20.5cm)', '36 (21.5cm)', '37 (22cm)', '38 (22.5cm)', '39 (23.5cm)', '40 (24cm)'],
    'Stivali': ['18 (10.5cm)', '19 (11cm)', '20 (11.5cm)', '21 (12cm)', '22 (12.5cm)', '23 (13.5cm)', '24 (14cm)', '25 (14.5cm)', '26 (15cm)', '27 (15.5cm)', '28 (16cm)', '29 (16.5cm)', '30 (17.5cm)', '31 (18cm)', '32 (18.5cm)', '33 (19.5cm)', '34 (20cm)', '35 (20.5cm)', '36 (21.5cm)', '37 (22cm)', '38 (22.5cm)', '39 (23.5cm)', '40 (24cm)'],
    'Sandali': ['18 (10.5cm)', '19 (11cm)', '20 (11.5cm)', '21 (12cm)', '22 (12.5cm)', '23 (13.5cm)', '24 (14cm)', '25 (14.5cm)', '26 (15cm)', '27 (15.5cm)', '28 (16cm)', '29 (16.5cm)', '30 (17.5cm)', '31 (18cm)', '32 (18.5cm)', '33 (19.5cm)', '34 (20cm)', '35 (20.5cm)', '36 (21.5cm)', '37 (22cm)', '38 (22.5cm)', '39 (23.5cm)', '40 (24cm)'],
    'Ballerine': ['18 (10.5cm)', '19 (11cm)', '20 (11.5cm)', '21 (12cm)', '22 (12.5cm)', '23 (13.5cm)', '24 (14cm)', '25 (14.5cm)', '26 (15cm)', '27 (15.5cm)', '28 (16cm)', '29 (16.5cm)', '30 (17.5cm)', '31 (18cm)', '32 (18.5cm)', '33 (19.5cm)', '34 (20cm)', '35 (20.5cm)', '36 (21.5cm)', '37 (22cm)', '38 (22.5cm)', '39 (23.5cm)', '40 (24cm)'],
    'Scarpe vintage': ['18 (10.5cm)', '19 (11cm)', '20 (11.5cm)', '21 (12cm)', '22 (12.5cm)', '23 (13.5cm)', '24 (14cm)', '25 (14.5cm)', '26 (15cm)', '27 (15.5cm)', '28 (16cm)', '29 (16.5cm)', '30 (17.5cm)', '31 (18cm)', '32 (18.5cm)', '33 (19.5cm)', '34 (20cm)', '35 (20.5cm)', '36 (21.5cm)', '37 (22cm)', '38 (22.5cm)', '39 (23.5cm)', '40 (24cm)'],
    'Stivali vintage': ['18 (10.5cm)', '19 (11cm)', '20 (11.5cm)', '21 (12cm)', '22 (12.5cm)', '23 (13.5cm)', '24 (14cm)', '25 (14.5cm)', '26 (15cm)', '27 (15.5cm)', '28 (16cm)', '29 (16.5cm)', '30 (17.5cm)', '31 (18cm)', '32 (18.5cm)', '33 (19.5cm)', '34 (20cm)', '35 (20.5cm)', '36 (21.5cm)', '37 (22cm)', '38 (22.5cm)', '39 (23.5cm)', '40 (24cm)'],
    'Sneakers vintage': ['18 (10.5cm)', '19 (11cm)', '20 (11.5cm)', '21 (12cm)', '22 (12.5cm)', '23 (13.5cm)', '24 (14cm)', '25 (14.5cm)', '26 (15cm)', '27 (15.5cm)', '28 (16cm)', '29 (16.5cm)', '30 (17.5cm)', '31 (18cm)', '32 (18.5cm)', '33 (19.5cm)', '34 (20cm)', '35 (20.5cm)', '36 (21.5cm)', '37 (22cm)', '38 (22.5cm)', '39 (23.5cm)', '40 (24cm)'],

    // Socks sizes - M cambiato in mesi
    'Calzini': ['0-6 mesi', '6-12 mesi', '1-2A', '2-4A', '4-6A', '6-8A', '8-10A', '10-12A', '12-14A'],
    'Collant': ['0-6 mesi', '6-12 mesi', '1-2A', '2-4A', '4-6A', '6-8A', '8-10A', '10-12A', '12-14A'],
    'Scaldamuscoli': ['0-6 mesi', '6-12 mesi', '1-2A', '2-4A', '4-6A', '6-8A', '8-10A', '10-12A', '12-14A'],

    // Accessories - One size or various - tradotti
    'Accessori': ['Taglia unica', 'Piccolo', 'Medio', 'Grande'],
    'Cappelli': ['XS (46-48cm)', 'S (48-50cm)', 'M (50-52cm)', 'L (52-54cm)', 'XL (54-56cm)'],
    'Berretti': ['XS (46-48cm)', 'S (48-50cm)', 'M (50-52cm)', 'L (52-54cm)', 'XL (54-56cm)'],
    'Basco': ['Taglia unica'],
    'Cuffie': ['Taglia unica'],
    'Cappelli da sole': ['XS (46-48cm)', 'S (48-50cm)', 'M (50-52cm)', 'L (52-54cm)', 'XL (54-56cm)'],
    'Cinture': ['XS (45-50cm)', 'S (50-60cm)', 'M (60-70cm)', 'L (70-80cm)', 'XL (80-90cm)'],
    'Cravatte': ['Taglia unica'],
    'Papillon': ['Taglia unica'],
    'Bretelle': ['Taglia unica'],
    'Fazzoletti da taschino': ['Taglia unica'],
    'Sciarpe': ['Taglia unica'],
    'Scialli': ['Taglia unica'],
    'Stole': ['Taglia unica'],
    'Guanti': ['XS (2-3A)', 'S (4-5A)', 'M (6-8A)', 'L (9-12A)', 'XL (13-14A)'],
    'Muffole': ['XS (2-3A)', 'S (4-5A)', 'M (6-8A)', 'L (9-12A)', 'XL (13-14A)'],
    'Occhiali da sole': ['Taglia unica'],
    'Occhiali': ['Taglia unica'],
    'Accessori per capelli': ['Taglia unica'],
    'Cerchietti': ['Taglia unica'],
    'Fermagli': ['Taglia unica'],
    'Fiocchi': ['Taglia unica'],
    'Corone': ['Taglia unica'],
    'Diademi': ['Taglia unica'],
    'Gioielli': ['Taglia unica'],
    'Collane': ['Taglia unica'],
    'Braccialetti': ['Taglia unica'],
    'Anelli': ['Regolabile', 'XS', 'S', 'M', 'L'],
    'Orecchini': ['Taglia unica'],
    'Borse': ['Piccolo', 'Medio', 'Grande'],
    'Borsette': ['Piccolo', 'Medio', 'Grande'],
    'Pochette': ['Taglia unica'],
    'Zaini': ['Piccolo', 'Medio', 'Grande'],
    'Borse shopping': ['Piccolo', 'Medio', 'Grande'],
    'Orologi': ['Regolabile'],
    'Ombrelli': ['Piccolo', 'Medio', 'Grande'],
    'Ventagli': ['Taglia unica'],
    'Accessori vintage': ['Taglia unica', 'Piccolo', 'Medio', 'Grande'],
    'Borse vintage': ['Piccolo', 'Medio', 'Grande'],
    'Gioielli vintage': ['Taglia unica'],
    'Cappelli vintage': ['XS (46-48cm)', 'S (48-50cm)', 'M (50-52cm)', 'L (52-54cm)', 'XL (54-56cm)'],
    'Sciarpe vintage': ['Taglia unica'],

    // Props and furniture - tradotte
    'Props fotografici': ['Piccolo', 'Medio', 'Grande', 'XL'],
    'Fondali': ['100x150cm', '150x200cm', '200x250cm', '250x300cm', 'Personalizzato'],
    'Fondali in tessuto': ['100x150cm', '150x200cm', '200x250cm', '250x300cm', 'Personalizzato'],
    'Fondali in carta': ['100x150cm', '150x200cm', '200x250cm', 'Rotolo'],
    'Mobili': ['Piccolo', 'Medio', 'Grande'],
    'Sedie': ['Taglia bambino', 'Standard'],
    'Sgabelli': ['Basso', 'Medio', 'Alto'],
    'Panche': ['Piccolo', 'Medio', 'Grande'],
    'Tavoli': ['Piccolo', 'Medio', 'Grande'],
    'Oggetti decorativi': ['Piccolo', 'Medio', 'Grande'],
    'Vasi': ['Piccolo', 'Medio', 'Grande'],
    'Cornici': ['Piccolo', 'Medio', 'Grande'],
    'Candele': ['Piccolo', 'Medio', 'Grande'],
    'Decorazioni stagionali': ['Piccolo', 'Medio', 'Grande', 'Set'],
    'Natale': ['Piccolo', 'Medio', 'Grande', 'Set'],
    'Halloween': ['Piccolo', 'Medio', 'Grande', 'Set'],
    'Pasqua': ['Piccolo', 'Medio', 'Grande', 'Set'],
    'Compleanno': ['Piccolo', 'Medio', 'Grande', 'Set'],
    'Illuminazione': ['Portatile', 'Standard', 'Grande'],
    'Luci da studio': ['Piccolo', 'Medio', 'Grande'],
    'Luci decorative': ['2m', '5m', '10m', '15m'],
    'Lampade': ['Piccolo', 'Medio', 'Grande'],
    'Tessuti': ['Piccolo', 'Medio', 'Grande'],
    'Coperte': ['Neonato', 'Bambino', 'Standard'],
    'Cuscini': ['Piccolo', 'Medio', 'Grande'],
    'Tappeti': ['60x90cm', '90x120cm', '120x180cm', '150x200cm'],
    'Tende': ['100x150cm', '150x200cm', '200x250cm'],
    'Insegne': ['Piccolo', 'Medio', 'Grande'],
    'Lavagne lettere': ['Piccolo (A5)', 'Medio (A4)', 'Grande (A3)'],
    'Insegne neon': ['Piccolo', 'Medio', 'Grande'],
    'Insegne legno': ['Piccolo', 'Medio', 'Grande'],
    'Piante': ['Piccolo', 'Medio', 'Grande'],
    'Fiori artificiali': ['Piccolo', 'Medio', 'Grande', 'Bouquet'],
    'Verde decorativo': ['Piccolo', 'Medio', 'Grande'],
    'Palloncini': ['Confezione da 10', 'Confezione da 20', 'Set'],
    'Striscioni': ['1m', '2m', '3m', 'Personalizzato'],
    'Ghirlande': ['1m', '2m', '3m', 'Personalizzato'],
    'Giocattoli': ['Piccolo', 'Medio', 'Grande'],
    'Bambole': ['Piccolo', 'Medio', 'Grande'],
    'Giochi': ['Taglia unica'],
    'Attrezzatura sportiva': ['Taglia bambino', 'Taglia junior'],
    'Giocattoli vintage': ['Piccolo', 'Medio', 'Grande'],
    'Giochi vintage': ['Taglia unica'],
    'Mobili vintage': ['Piccolo', 'Medio', 'Grande'],
    'Decorazioni vintage': ['Piccolo', 'Medio', 'Grande'],
    'Oggetti antichi': ['Piccolo', 'Medio', 'Grande'],
    'Abbigliamento retrò': ['XS', 'S', 'M', 'L', 'XL'],
    'Vintage firmato': ['XS', 'S', 'M', 'L', 'XL']
};

// Color palette - comprehensive list (tradotta)
const COLORS = [
    'Bianco', 'Avorio', 'Crema', 'Beige', 'Tan', 'Kaki',
    'Nero', 'Antracite', 'Grigio', 'Grigio chiaro', 'Argento',
    'Rosso', 'Bordeaux', 'Marrone', 'Vinaccia', 'Corallo', 'Rosa', 'Rosa acceso', 'Rosa antico', 'Rosa cipria',
    'Arancione', 'Ruggine', 'Terracotta', 'Pesca', 'Albicocca',
    'Giallo', 'Oro', 'Senape', 'Limone',
    'Verde', 'Verde oliva', 'Verde foresta', 'Menta', 'Salvia', 'Smeraldo', 'Verde lime',
    'Blu', 'Blu navy', 'Blu reale', 'Celeste', 'Turchese', 'Verde acqua', 'Acquamarina', 'Ciano',
    'Viola', 'Lavanda', 'Lilla', 'Violetto', 'Prugna', 'Malva',
    'Marrone', 'Cioccolato', 'Cammello', 'Moca', 'Caffè',
    'Multicolore', 'Arcobaleno', 'Floreale', 'Rigato', 'Pois', 'A quadri', 'Scozzese',
    'Oro metallizzato', 'Argento metallizzato', 'Oro rosa'
];

// Item condition options (tradotte)
const CONDITIONS = [
    'Nuovo con Etichette',
    'Nuovo senza Etichette',
    'Come Nuovo',
    'Eccellente',
    'Molto Buono',
    'Buono',
    'Discreto',
    'Vintage'
];

// Initialize form
document.addEventListener('DOMContentLoaded', function() {
    initializeWardrobeForm();
});

function initializeWardrobeForm() {
    const destinationSelect = document.getElementById('destination');
    const categorySelect = document.getElementById('category');
    const sizeSelect = document.getElementById('size');

    if (destinationSelect) {
        destinationSelect.addEventListener('change', function() {
            updateCategories(this.value);
        });
    }

    if (categorySelect) {
        categorySelect.addEventListener('change', function() {
            updateSizes(this.value);
        });
    }

    // Initialize image upload preview
    initializeImageUpload();
}

function updateCategories(destination) {
    const categorySelect = document.getElementById('category');
    const sizeSelect = document.getElementById('size');

    if (!categorySelect) return;

    // Clear existing options
    categorySelect.innerHTML = '<option value="">Seleziona Categoria</option>';

    if (destination && CATEGORIES_BY_DESTINATION[destination]) {
        const categories = CATEGORIES_BY_DESTINATION[destination];
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    }

    // Reset size select
    if (sizeSelect) {
        sizeSelect.innerHTML = '<option value="">Seleziona Taglia</option>';
    }
}

function updateSizes(category) {
    const sizeSelect = document.getElementById('size');

    if (!sizeSelect) return;

    // Clear existing options
    sizeSelect.innerHTML = '<option value="">Seleziona Taglia</option>';

    if (category && SIZES_BY_CATEGORY[category]) {
        const sizes = SIZES_BY_CATEGORY[category];
        sizes.forEach(size => {
            const option = document.createElement('option');
            option.value = size;
            option.textContent = size;
            sizeSelect.appendChild(option);
        });
    } else {
        // Default sizes if category not found
        const defaultSizes = ['XS', 'S', 'M', 'L', 'XL', 'One Size'];
        defaultSizes.forEach(size => {
            const option = document.createElement('option');
            option.value = size;
            option.textContent = size;
            sizeSelect.appendChild(option);
        });
    }
}

function initializeImageUpload() {
    const imageInput = document.getElementById('images');
    if (!imageInput) return;

    imageInput.addEventListener('change', function(e) {
        handleImagePreview(e.target.files);
    });
}

function handleImagePreview(files) {
    const previewContainer = document.getElementById('imagePreviewContainer');
    if (!previewContainer) return;

    // Clear existing previews
    previewContainer.innerHTML = '';

    Array.from(files).forEach((file, index) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = function(e) {
                const previewItem = document.createElement('div');
                previewItem.className = 'image-preview-item';
                previewItem.innerHTML = `
                    <img src="${e.target.result}" alt="Preview ${index + 1}">
                    <button type="button" class="remove-image" onclick="removeImagePreview(${index})" title="Remove image">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                previewContainer.appendChild(previewItem);
            };

            reader.readAsDataURL(file);
        }
    });
}

function removeImagePreview(index) {
    const imageInput = document.getElementById('images');
    if (!imageInput) return;

    const dt = new DataTransfer();
    const files = imageInput.files;

    for (let i = 0; i < files.length; i++) {
        if (i !== index) {
            dt.items.add(files[i]);
        }
    }

    imageInput.files = dt.files;
    handleImagePreview(imageInput.files);
}

function toggleAddItemForm() {
    const form = document.getElementById('addItemForm');
    if (form) {
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    }
}
