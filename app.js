// Typefaces Catalog Metadata (Mapping to the local files in /fonts)
const typefaces = [
  {
    id: 'abc-bingo',
    name: 'ABC Bingo',
    fontFamily: 'ABC Bingo',
    defaultText: 'ABC Bingo',
    styles: ['Bold'],
    priceDesktop: 49,
    priceWeb: 49,
    priceApp: 149,
    charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?,.:;@#%&*'
  },
  {
    id: 'abc-connect',
    name: 'ABC Connect',
    fontFamily: 'ABC Connect',
    defaultText: 'ABC Connect',
    styles: ['Flat'],
    priceDesktop: 49,
    priceWeb: 49,
    priceApp: 149,
    charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?,.:;@#%&*'
  },
  {
    id: 'monument',
    name: 'Monument',
    fontFamily: 'ABC Monument Grotesk', // Kept underlying file family loading
    defaultText: 'Monument',
    styles: ['Ultra'],
    priceDesktop: 49,
    priceWeb: 49,
    priceApp: 149,
    charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?,.:;@#%&*'
  },
  {
    id: 'at-canopy',
    name: 'AT Canopy',
    fontFamily: 'AT Canopy',
    defaultText: 'AT Canopy',
    styles: ['Bold'],
    priceDesktop: 39,
    priceWeb: 39,
    priceApp: 119,
    charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?,.:;@#%&*'
  },
  {
    id: 'bandit',
    name: 'Bandit',
    fontFamily: 'Bandit',
    defaultText: 'Bandit',
    styles: ['Condensed'],
    priceDesktop: 39,
    priceWeb: 39,
    priceApp: 119,
    charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?,.:;@#%&*'
  },
  {
    id: 'blankenhorn',
    name: 'Blankenhorn',
    fontFamily: 'Blankenhorn',
    defaultText: 'Blankenhorn',
    styles: ['Script'],
    priceDesktop: 49,
    priceWeb: 49,
    priceApp: 149,
    charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?,.:;@#%&*'
  }
];

// Global Application State
let cart = [];
let activeTypeface = null;

// DOM Elements
const fontsGrid = document.getElementById('fonts-grid');

// Overlay Elements
const backdrop = document.getElementById('drawer-backdrop');
const specimenDrawer = document.getElementById('specimen-drawer');
const cartDrawer = document.getElementById('cart-drawer');
const aboutModal = document.getElementById('about-modal');

// Header Triggers & Close Buttons
const btnKatalog = document.getElementById('btn-katalog');
const btnLogo = document.getElementById('btn-logo');
const btnCart = document.getElementById('btn-cart');

const btnCloseSpecimen = document.getElementById('btn-close-specimen');
const btnCloseCart = document.getElementById('btn-close-cart');
const btnCloseAbout = document.getElementById('btn-close-about');

// Drawer Elements
const drawerFontName = document.getElementById('drawer-font-name');
const drawerTextarea = document.getElementById('drawer-textarea');
const drawerSizeSlider = document.getElementById('drawer-size-slider');
const drawerSizeVal = document.getElementById('drawer-size-val');
const drawerWeightsList = document.getElementById('drawer-weights-list');
const drawerCharset = document.getElementById('drawer-character-set');
const btnAddToCart = document.getElementById('btn-add-to-cart');
const drawerTotalVal = document.getElementById('drawer-total-price');

// Cart Elements
const cartItemsContainer = document.getElementById('cart-items-container');
const cartEmptyMessage = document.getElementById('cart-empty-message');
const cartTotalPrice = document.getElementById('cart-total-price');
const btnCheckout = document.getElementById('btn-checkout');

// Footer Links
const linkAbout = document.getElementById('link-about');
const linkContact = document.getElementById('link-contact');
const linkFaq = document.getElementById('link-faq');
const linkTerms = document.getElementById('link-terms');

// Initialize Application
function init() {
  renderGrid();
  setupEventListeners();
  updateCartUI();
}

// Render Font Cards on Landing Page
function renderGrid() {
  fontsGrid.innerHTML = '';
  
  typefaces.forEach((tf) => {
    const card = document.createElement('div');
    card.className = 'font-card';
    card.dataset.id = tf.id;
    card.setAttribute('data-font', tf.id);
    
    // Editable specimen line
    const textDiv = document.createElement('div');
    textDiv.className = 'specimen-text';
    textDiv.contentEditable = 'true';
    textDiv.spellcheck = false;
    
    // Apply typeface-specific style properties
    textDiv.style.fontFamily = `"${tf.fontFamily}", sans-serif`;
    if (tf.fontStyle) {
      textDiv.style.fontStyle = tf.fontStyle;
    }
    
    // Load Default Text
    textDiv.textContent = tf.defaultText;
    
    // Prevent clicking in editable text from opening detail drawer
    textDiv.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    
    // Sync single text input on type
    textDiv.addEventListener('input', (e) => {
      tf.defaultText = e.target.textContent;
    });

    card.appendChild(textDiv);
    
    // Clicking card opens the specimen drawer
    card.addEventListener('click', () => {
      openSpecimenDrawer(tf);
    });
    
    fontsGrid.appendChild(card);
  });
}

// Setup Event Listeners
function setupEventListeners() {
  // Navigation / Modal bindings
  linkAbout.addEventListener('click', () => openModal(aboutModal));
  linkContact.addEventListener('click', () => openModal(aboutModal));
  linkFaq.addEventListener('click', () => openModal(aboutModal));
  linkTerms.addEventListener('click', () => openModal(aboutModal));
  
  btnCloseAbout.addEventListener('click', () => closeModal(aboutModal));
  aboutModal.addEventListener('click', (e) => {
    if (e.target === aboutModal) closeModal(aboutModal);
  });
  
  // Katalog / Logo click restarts views
  btnKatalog.addEventListener('click', () => {
    // Reset default text settings to initial values
    typefaces[0].defaultText = 'ABC Bingo';
    typefaces[1].defaultText = 'ABC Connect';
    typefaces[2].defaultText = 'Monument';
    typefaces[3].defaultText = 'AT Canopy';
    typefaces[4].defaultText = 'Bandit';
    typefaces[5].defaultText = 'Blankenhorn';
    renderGrid();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  btnLogo.addEventListener('click', () => {
    window.location.reload();
  });

  // Drawer close events
  btnCloseSpecimen.addEventListener('click', closeDrawer);
  btnCloseCart.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);
  
  // Cart open/close triggers
  btnCart.addEventListener('click', openCartDrawer);
  
  // Drawer slider
  drawerSizeSlider.addEventListener('input', (e) => {
    const val = e.target.value;
    drawerSizeVal.textContent = `${val}px`;
    drawerTextarea.style.fontSize = `${val}px`;
  });
  
  // Calculate total in Drawer Buy panel
  const licenses = ['license-desktop', 'license-web', 'license-app'];
  licenses.forEach(id => {
    document.getElementById(id).addEventListener('change', updateDrawerPrice);
  });
  
  // Add to Cart Action
  btnAddToCart.addEventListener('click', addActiveToCart);
  
  // Checkout simulation
  btnCheckout.addEventListener('click', simulateCheckout);
}

// Specimen drawer display
function openSpecimenDrawer(tf) {
  activeTypeface = tf;
  drawerFontName.textContent = tf.name.toUpperCase();
  
  // Load tester textarea
  drawerTextarea.value = tf.defaultText;
  drawerTextarea.style.fontFamily = `"${tf.fontFamily}", sans-serif`;
  if (tf.fontStyle) {
    drawerTextarea.style.fontStyle = tf.fontStyle;
  } else {
    drawerTextarea.style.fontStyle = 'normal';
  }
  
  // Reset slider
  drawerSizeSlider.value = 80;
  drawerSizeVal.textContent = '80px';
  drawerTextarea.style.fontSize = '80px';
  
  // Pop weights lists
  drawerWeightsList.innerHTML = '';
  tf.styles.forEach(style => {
    const row = document.createElement('div');
    row.className = 'weight-row';
    
    const nameSpan = document.createElement('span');
    nameSpan.className = 'weight-name';
    nameSpan.textContent = style.toUpperCase();
    row.appendChild(nameSpan);
    
    const specSpan = document.createElement('span');
    specSpan.className = 'weight-specimen';
    specSpan.textContent = 'Heute';
    specSpan.style.fontFamily = `"${tf.fontFamily}", sans-serif`;
    
    // Set style properties mapping
    if (style.includes('Light')) specSpan.style.fontWeight = '300';
    else if (style.includes('Medium')) specSpan.style.fontWeight = '500';
    else if (style.includes('Bold')) specSpan.style.fontWeight = '700';
    else if (style.includes('Extra Bold') || style.includes('Black')) specSpan.style.fontWeight = '800';
    else specSpan.style.fontWeight = '400';
    
    if (style.toLowerCase().includes('italic') || tf.fontStyle === 'italic') {
      specSpan.style.fontStyle = 'italic';
    }
    
    row.appendChild(specSpan);
    drawerWeightsList.appendChild(row);
  });
  
  // Pop Charset
  drawerCharset.innerHTML = '';
  tf.charset.split('').forEach(char => {
    const cell = document.createElement('div');
    cell.className = 'char-cell';
    cell.textContent = char;
    cell.style.fontFamily = `"${tf.fontFamily}", sans-serif`;
    if (tf.fontStyle) cell.style.fontStyle = tf.fontStyle;
    drawerCharset.appendChild(cell);
  });
  
  // Reset License checkboxes
  document.getElementById('license-desktop').checked = true;
  document.getElementById('license-web').checked = false;
  document.getElementById('license-app').checked = false;
  
  // Reset prices labels
  document.getElementById('price-desktop').textContent = `$${tf.priceDesktop}`;
  document.getElementById('price-web').textContent = `$${tf.priceWeb}`;
  document.getElementById('price-app').textContent = `$${tf.priceApp}`;
  
  updateDrawerPrice();
  
  // Slide Drawer Open
  closeDrawer(); // Ensure other drawer is shut
  backdrop.classList.add('active');
  specimenDrawer.classList.add('active');
}

function updateDrawerPrice() {
  if (!activeTypeface) return;
  let total = 0;
  if (document.getElementById('license-desktop').checked) total += activeTypeface.priceDesktop;
  if (document.getElementById('license-web').checked) total += activeTypeface.priceWeb;
  if (document.getElementById('license-app').checked) total += activeTypeface.priceApp;
  
  drawerTotalVal.textContent = `$${total}`;
}

// Drawer and Modal helpers
function closeDrawer() {
  backdrop.classList.remove('active');
  specimenDrawer.classList.remove('active');
  cartDrawer.classList.remove('active');
}

function openCartDrawer() {
  closeDrawer();
  backdrop.classList.add('active');
  cartDrawer.classList.add('active');
}

// Shopping Cart Core Logic
function addActiveToCart() {
  if (!activeTypeface) return;
  
  const selectedLicenses = [];
  let itemPrice = 0;
  
  if (document.getElementById('license-desktop').checked) {
    selectedLicenses.push('Desktop');
    itemPrice += activeTypeface.priceDesktop;
  }
  if (document.getElementById('license-web').checked) {
    selectedLicenses.push('Web');
    itemPrice += activeTypeface.priceWeb;
  }
  if (document.getElementById('license-app').checked) {
    selectedLicenses.push('App');
    itemPrice += activeTypeface.priceApp;
  }
  
  if (selectedLicenses.length === 0) {
    alert('Please select at least one license.');
    return;
  }
  
  // Check if item with exact same configurations is already in cart
  const existingItemIndex = cart.findIndex(item => 
    item.id === activeTypeface.id && 
    JSON.stringify(item.licenses) === JSON.stringify(selectedLicenses)
  );
  
  if (existingItemIndex > -1) {
    // Already added, skip or notify
  } else {
    cart.push({
      id: activeTypeface.id,
      name: activeTypeface.name,
      licenses: selectedLicenses,
      price: itemPrice
    });
  }
  
  updateCartUI();
  openCartDrawer();
}

function updateCartUI() {
  // Update count in the header CART button
  btnCart.textContent = `CART (${cart.length})`;
  
  if (cart.length === 0) {
    cartItemsContainer.style.display = 'none';
    cartEmptyMessage.style.display = 'block';
    cartTotalPrice.textContent = '$0';
    btnCheckout.disabled = true;
    btnCheckout.style.opacity = '0.5';
    btnCheckout.style.cursor = 'not-allowed';
  } else {
    cartItemsContainer.style.display = 'block';
    cartEmptyMessage.style.display = 'none';
    btnCheckout.disabled = false;
    btnCheckout.style.opacity = '1';
    btnCheckout.style.cursor = 'pointer';
    
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
      total += item.price;
      
      const el = document.createElement('div');
      el.className = 'cart-item';
      
      const header = document.createElement('div');
      header.className = 'cart-item-header';
      
      const title = document.createElement('span');
      title.className = 'cart-item-title';
      title.textContent = item.name.toUpperCase();
      header.appendChild(title);
      
      const removeBtn = document.createElement('button');
      removeBtn.className = 'cart-item-remove';
      removeBtn.textContent = 'REMOVE';
      removeBtn.addEventListener('click', () => {
        cart.splice(index, 1);
        updateCartUI();
      });
      header.appendChild(removeBtn);
      el.appendChild(header);
      
      const details = document.createElement('div');
      details.className = 'cart-item-details';
      details.textContent = `Licenses: ${item.licenses.join(', ')}`;
      el.appendChild(details);
      
      const price = document.createElement('div');
      price.className = 'cart-item-price';
      price.textContent = `$${item.price}`;
      el.appendChild(price);
      
      cartItemsContainer.appendChild(el);
    });
    
    cartTotalPrice.textContent = `$${total}`;
  }
}

// Simulated Purchase Checkout
function simulateCheckout() {
  if (cart.length === 0) return;
  
  alert(`Thank you for shopping with Heute Type!\nYour purchase simulation is complete.\n\nSummary:\nTotal items: ${cart.length}\nTotal price: ${cartTotalPrice.textContent}\n\nIn production, this would securely process your transaction and generate download links for .otf, .ttf, and web font packages.`);
  cart = [];
  updateCartUI();
  closeDrawer();
}

// Start app
window.addEventListener('DOMContentLoaded', init);
