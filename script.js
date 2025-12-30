// ===================================
// ADDIS CAFÉ LEIPZIG - JAVASCRIPT
// Ethiopian Restaurant Website
// ===================================

// === SUPABASE CONFIGURATION ===
const SUPABASE_URL = 'https://fgpdpafbshjmhttifpca.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZncGRwYWZic2hqbWh0dGlmcGNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0OTI1NzIsImV4cCI6MjA1MTA2ODU3Mn0.sb_publishable_NIZiIXUMqPnI_CIfIgGELg_Zk73A7YC';

// Initialize Supabase client
let dbClient;
try {
    if (window.supabase) {
        dbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    } else {
        console.warn('Supabase JS library not loaded - check internet connection or CDN permissions');
    }
} catch (err) {
    console.error('Error initializing Supabase:', err);
}

// === MULTI-LANGUAGE SUPPORT ===
let currentLanguage = localStorage.getItem('language') || 'en';

// Apply language function - defined globally
function applyLanguage(lang) {
    console.log('applyLanguage called with:', lang);

    if (typeof translations === 'undefined') {
        console.error('Translations object not found! Check if translations.js is loaded correctly.');
        return;
    }

    const t = translations[lang];
    if (!t) {
        console.error('Translations not found for language:', lang);
        return;
    }

    console.log('Translations found for', lang, ':', Object.keys(t));

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Handle RTL for Arabic
    if (lang === 'ar') {
        document.documentElement.dir = 'rtl';
        document.body.style.direction = 'rtl';
        console.log('Applied RTL for Arabic');
    } else {
        document.documentElement.dir = 'ltr';
        document.body.style.direction = 'ltr';
        console.log('Applied LTR');
    }

    // Update all elements with data-i18n attribute
    const i18nElements = document.querySelectorAll('[data-i18n]');
    console.log('Found', i18nElements.length, 'elements with data-i18n');

    i18nElements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let value = t;

        for (const k of keys) {
            value = value[k];
            if (!value) break;
        }

        if (value) {
            element.textContent = value;
        }
    });

    // Update specific elements by ID or class
    console.log('Updating sections...');
    updateHeroSection(t);
    updateAboutSection(t);
    updateMenuSection(t);
    updateGallerySection(t);
    updateReservationSection(t);
    updateContactSection(t);
    updateFooter(t);
    console.log('Language applied successfully');
}

function updateHeroSection(t) {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const ratingText = document.querySelector('.rating-text');
    const scrollText = document.querySelector('.scroll-indicator span');
    const btnReserve = document.querySelector('.hero-buttons .btn-primary');
    const btnMenu = document.querySelector('.hero-buttons .btn-secondary');

    if (heroTitle) heroTitle.textContent = t.hero.title;
    if (heroSubtitle) heroSubtitle.textContent = t.hero.subtitle;
    if (ratingText) ratingText.textContent = t.hero.rating;
    if (scrollText) scrollText.textContent = t.hero.scrollDown;
    if (btnReserve) btnReserve.textContent = t.hero.btnReserve;
    if (btnMenu) btnMenu.textContent = t.hero.btnMenu;
}

function updateAboutSection(t) {
    const sectionTitle = document.querySelector('#about .section-title');
    const lead = document.querySelector('.about-text .lead');
    const paragraphs = document.querySelectorAll('.about-text p:not(.lead)');

    if (sectionTitle) sectionTitle.textContent = t.about.title;
    if (lead) lead.textContent = t.about.lead;
    if (paragraphs[0]) paragraphs[0].textContent = t.about.text1;
    if (paragraphs[1]) paragraphs[1].textContent = t.about.text2;

    // Update feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    const features = [
        { title: t.about.veganTitle, desc: t.about.veganDesc },
        { title: t.about.womenTitle, desc: t.about.womenDesc },
        { title: t.about.lgbtqTitle, desc: t.about.lgbtqDesc },
        { title: t.about.coffeeTitle, desc: t.about.coffeeDesc }
    ];

    featureCards.forEach((card, index) => {
        const h3 = card.querySelector('h3');
        const p = card.querySelector('p');
        if (h3 && features[index]) h3.textContent = features[index].title;
        if (p && features[index]) p.textContent = features[index].desc;
    });

    // Update highlights
    const highlightItems = document.querySelectorAll('.highlight-item');
    const highlights = [
        { label: t.about.priceLabel, value: t.about.priceValue },
        { label: t.about.atmosphereLabel, value: t.about.atmosphereValue },
        { label: t.about.servicesLabel, value: t.about.servicesValue }
    ];

    highlightItems.forEach((item, index) => {
        const label = item.querySelector('.highlight-label');
        const value = item.querySelector('.highlight-value');
        if (label && highlights[index]) label.textContent = highlights[index].label;
        if (value && highlights[index]) value.textContent = highlights[index].value;
    });
}

function updateMenuSection(t) {
    const sectionTitle = document.querySelector('#menu .section-title');
    const sectionSubtitle = document.querySelector('#menu .section-subtitle');

    if (sectionTitle) sectionTitle.textContent = t.menu.title;
    if (sectionSubtitle) sectionSubtitle.textContent = t.menu.subtitle;

    // Update category titles
    const categoryTitles = document.querySelectorAll('.category-title');

    categoryTitles.forEach(title => {
        const type = title.getAttribute('data-menu-type');

        switch (type) {
            case 'appetizers':
                title.textContent = `Vorspeisen (${t.menu.appetizers})`;
                break;
            case 'mains':
                title.textContent = `Hauptspeisen (${t.menu.mainDishes})`;
                break;
            case 'vegan':
                title.textContent = t.menu.veganMenu;
                break;
            case 'sides':
                title.textContent = `Soßen, Gemüsepfannen & Specials (${t.menu.sauces})`;
                break;
            case 'specials':
                title.textContent = t.menu.specials;
                break;
            case 'desserts':
                title.textContent = t.menu.desserts;
                break;
            case 'kids':
                title.textContent = `Kinder (${t.menu.kids})`;
                break;
        }
    });
}

function updateGallerySection(t) {
    const sectionTitle = document.querySelector('#gallery .section-title');
    const sectionSubtitle = document.querySelector('#gallery .section-subtitle');

    if (sectionTitle) sectionTitle.textContent = t.gallery.title;
    if (sectionSubtitle) sectionSubtitle.textContent = t.gallery.subtitle;
}

function updateReservationSection(t) {
    const sectionTitle = document.querySelector('#reservation .section-title');
    const sectionSubtitle = document.querySelector('#reservation .section-subtitle');
    const openingHoursTitle = document.querySelector('.reservation-info h3');

    if (sectionTitle) sectionTitle.textContent = t.reservation.title;
    if (sectionSubtitle) sectionSubtitle.textContent = t.reservation.subtitle;
    if (openingHoursTitle) openingHoursTitle.textContent = t.reservation.openingHours;

    // Update days and times
    const hoursItems = document.querySelectorAll('.hours-item');
    if (hoursItems[0]) {
        hoursItems[0].querySelector('.day').textContent = t.reservation.monThu;
        hoursItems[0].querySelector('.time').textContent = t.reservation.time1;
    }
    if (hoursItems[1]) {
        hoursItems[1].querySelector('.day').textContent = t.reservation.friSat;
        hoursItems[1].querySelector('.time').textContent = t.reservation.time2;
    }
    if (hoursItems[2]) {
        hoursItems[2].querySelector('.day').textContent = t.reservation.sunday;
        hoursItems[2].querySelector('.time').textContent = t.reservation.time3;
    }

    // Update note
    const noteTitle = document.querySelector('.reservation-note strong');
    const noteText = document.querySelectorAll('.reservation-note p')[1];
    if (noteTitle) noteTitle.textContent = t.reservation.noteTitle;
    if (noteText) noteText.textContent = t.reservation.noteText;

    // Update form labels
    document.querySelector('label[for="resName"]').textContent = t.reservation.labelName;
    document.querySelector('label[for="resEmail"]').textContent = t.reservation.labelEmail;
    document.querySelector('label[for="resPhone"]').textContent = t.reservation.labelPhone;
    document.querySelector('label[for="resPartySize"]').textContent = t.reservation.labelPartySize;
    document.querySelector('label[for="resDate"]').textContent = t.reservation.labelDate;
    document.querySelector('label[for="resTime"]').textContent = t.reservation.labelTime;
    document.querySelector('label[for="resRequests"]').textContent = t.reservation.labelRequests;

    // Update placeholder
    document.getElementById('resRequests').placeholder = t.reservation.placeholderRequests;

    // Update party size options
    const partySizeSelect = document.getElementById('resPartySize');
    if (partySizeSelect) {
        partySizeSelect.options[0].textContent = t.reservation.selectPlaceholder;
        partySizeSelect.options[1].textContent = t.reservation.person1;
        partySizeSelect.options[2].textContent = t.reservation.people2;
        partySizeSelect.options[3].textContent = t.reservation.people3;
        partySizeSelect.options[4].textContent = t.reservation.people4;
        partySizeSelect.options[5].textContent = t.reservation.people5;
        partySizeSelect.options[6].textContent = t.reservation.people6;
        partySizeSelect.options[7].textContent = t.reservation.people7;
        partySizeSelect.options[8].textContent = t.reservation.people8;
        partySizeSelect.options[9].textContent = t.reservation.people9;
        partySizeSelect.options[10].textContent = t.reservation.people10;
    }

    // Update submit button
    const btnText = document.querySelector('.btn-submit .btn-text');
    if (btnText) btnText.textContent = t.reservation.btnSubmit;
}

function updateContactSection(t) {
    const sectionTitle = document.querySelector('#contact .section-title');
    if (sectionTitle) sectionTitle.textContent = t.contact.title;

    // Update contact items
    const contactItems = document.querySelectorAll('.contact-item h3');
    if (contactItems[0]) contactItems[0].textContent = t.contact.address;
    if (contactItems[1]) contactItems[1].textContent = t.contact.phone;
    if (contactItems[2]) contactItems[2].textContent = t.contact.website;
    if (contactItems[3]) contactItems[3].textContent = t.contact.accessibility;

    const accessibilityText = document.querySelectorAll('.contact-item p')[3];
    if (accessibilityText) accessibilityText.textContent = t.contact.accessibilityText;
}

function updateFooter(t) {
    const footerSections = document.querySelectorAll('.footer-section');

    // Description
    if (footerSections[0]) {
        const p = footerSections[0].querySelector('p');
        if (p) p.textContent = t.footer.description;
    }

    // Quick Links
    if (footerSections[1]) {
        const h3 = footerSections[1].querySelector('h3');
        if (h3) h3.textContent = t.footer.quickLinks;
    }

    // Opening Hours
    if (footerSections[2]) {
        const h3 = footerSections[2].querySelector('h3');
        const p = footerSections[2].querySelector('p');
        if (h3) h3.textContent = t.footer.openingHours;
        if (p) p.textContent = t.footer.hours;
    }

    // Contact
    if (footerSections[3]) {
        const h3 = footerSections[3].querySelector('h3');
        if (h3) h3.textContent = t.footer.contactTitle;
    }

    // Copyright
    const copyright = document.querySelector('.footer-bottom p');
    if (copyright) copyright.textContent = t.footer.copyright;
}

// Initialize language system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing language system...');
    const languageSelector = document.getElementById('languageSelector');

    if (!languageSelector) {
        console.error('Language selector not found!');
        return;
    }

    console.log('Language selector found, current language:', currentLanguage);

    // Set initial language
    languageSelector.value = currentLanguage;

    // Apply language after a small delay to ensure all elements are rendered
    setTimeout(() => {
        console.log('Applying initial language:', currentLanguage);
        applyLanguage(currentLanguage);
    }, 100);

    // Language change event
    languageSelector.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        console.log('Language changed to:', selectedLang);
        currentLanguage = selectedLang;
        localStorage.setItem('language', selectedLang);
        applyLanguage(selectedLang);
    });

    console.log('Language system initialized successfully');
});

// === NAVIGATION ===
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger icon
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Active section highlighting
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - navbar.offsetHeight - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// === GALLERY & LIGHTBOX ===
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxCounter = document.getElementById('lightboxCounter');

let currentImageIndex = 0;
const galleryImages = Array.from(galleryItems).map(item => ({
    src: item.querySelector('img').src,
    alt: item.querySelector('img').alt
}));

// Open lightbox
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox();
    });
});

function openLightbox() {
    lightbox.classList.add('active');
    updateLightboxImage();
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function updateLightboxImage() {
    const image = galleryImages[currentImageIndex];
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightboxImage();
}

// Lightbox controls
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrevImage);
lightboxNext.addEventListener('click', showNextImage);

// Close lightbox on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrevImage();
    if (e.key === 'ArrowRight') showNextImage();
});

// Touch gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            showNextImage();
        } else {
            showPrevImage();
        }
    }
}

// === RESERVATION FORM ===
const reservationForm = document.getElementById('reservationForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoader = submitBtn.querySelector('.btn-loader');
const formMessage = document.getElementById('formMessage');
const resDate = document.getElementById('resDate');

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
resDate.setAttribute('min', today);

// Form validation
function validateForm(formData) {
    const errors = [];

    // Name validation
    if (formData.name.trim().length < 2) {
        errors.push('Please enter a valid name');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        errors.push('Please enter a valid email address');
    }

    // Phone validation
    if (formData.phone.trim().length < 6) {
        errors.push('Please enter a valid phone number');
    }

    // Party size validation
    if (!formData.partySize || formData.partySize < 1) {
        errors.push('Please select party size');
    }

    // Date validation
    const selectedDate = new Date(formData.date);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    if (selectedDate < todayDate) {
        errors.push('Please select a future date');
    }

    // Time validation
    if (!formData.time) {
        errors.push('Please select a time');
    } else {
        const [hours, minutes] = formData.time.split(':').map(Number);
        const timeInMinutes = hours * 60 + minutes;
        const openTime = 16 * 60; // 4:00 PM
        const closeTime = 23 * 60; // 11:00 PM

        if (timeInMinutes < openTime || timeInMinutes > closeTime) {
            errors.push('Please select a time between 4:00 PM and 11:00 PM');
        }
    }

    return errors;
}

// Show message
function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;

    // Auto-hide after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

// Submit reservation
reservationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('resName').value,
        email: document.getElementById('resEmail').value,
        phone: document.getElementById('resPhone').value,
        partySize: parseInt(document.getElementById('resPartySize').value),
        date: document.getElementById('resDate').value,
        time: document.getElementById('resTime').value,
        requests: document.getElementById('resRequests').value
    };

    // Validate form
    const errors = validateForm(formData);
    if (errors.length > 0) {
        showMessage(errors.join('. '), 'error');
        return;
    }

    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';

    try {
        if (!dbClient) {
            throw new Error('Database client not initialized (offline or CDN blocked)');
        }

        // Insert reservation into Supabase
        const { data, error } = await dbClient
            .from('reservations')
            .insert([
                {
                    customer_name: formData.name,
                    customer_email: formData.email,
                    customer_phone: formData.phone,
                    party_size: formData.partySize,
                    reservation_date: formData.date,
                    reservation_time: formData.time,
                    special_requests: formData.requests || null,
                    status: 'pending'
                }
            ])
            .select();

        if (error) {
            throw error;
        }

        // Success
        showMessage('Reservation submitted successfully! We will contact you shortly to confirm.', 'success');
        reservationForm.reset();

        // Send WhatsApp notification (optional)
        const whatsappMessage = `New Reservation Request:\nName: ${formData.name}\nDate: ${formData.date}\nTime: ${formData.time}\nParty Size: ${formData.partySize}\nPhone: ${formData.phone}`;
        const whatsappUrl = `https://wa.me/4934124831144?text=${encodeURIComponent(whatsappMessage)}`;

        // Optionally open WhatsApp (commented out to not interrupt user)
        // window.open(whatsappUrl, '_blank');

    } catch (error) {
        console.error('Reservation error:', error);

        // Check if it's a table creation error
        if (error.message && error.message.includes('relation "public.reservations" does not exist')) {
            showMessage('Database setup required. Please contact the restaurant directly at +49 341 24831144.', 'error');
        } else {
            showMessage('Sorry, there was an error submitting your reservation. Please call us at +49 341 24831144.', 'error');
        }
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }
});

// === MAP INTEGRATION ===
function initMap() {
    // Restaurant coordinates: Brüderstraße 39, 04103 Leipzig
    const restaurantLocation = [51.3397, 12.3731];

    // Initialize map
    const map = L.map('map').setView(restaurantLocation, 16);

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);

    // Custom marker icon
    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
            <div style="
                background: #D4AF37;
                width: 40px;
                height: 40px;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                border: 3px solid #8B0000;
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                <span style="
                    transform: rotate(45deg);
                    font-size: 20px;
                ">🍽️</span>
            </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });

    // Add marker
    const marker = L.marker(restaurantLocation, { icon: customIcon }).addTo(map);

    // Add popup
    marker.bindPopup(`
        <div style="text-align: center; font-family: 'Inter', sans-serif;">
            <h3 style="color: #8B0000; margin-bottom: 8px;">Addis Café Leipzig</h3>
            <p style="margin: 4px 0;">Brüderstraße 39</p>
            <p style="margin: 4px 0;">04103 Leipzig, Germany</p>
            <a href="https://www.google.com/maps/dir/?api=1&destination=51.3397,12.3731" 
               target="_blank" 
               style="color: #D4AF37; font-weight: 600; margin-top: 8px; display: inline-block;">
                Get Directions →
            </a>
        </div>
    `).openPopup();
}

// Initialize map when DOM is loaded
if (document.getElementById('map')) {
    initMap();
}

// === SCROLL ANIMATIONS ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.menu-item, .feature-card, .gallery-item, .contact-item');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// === LAZY LOADING IMAGES ===
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// === UTILITY FUNCTIONS ===

// Sanitize input
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Format time
function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// === CONSOLE MESSAGE ===
console.log('%c🍽️ Addis Café Leipzig', 'font-size: 24px; color: #D4AF37; font-weight: bold;');
console.log('%cWebsite built with ❤️ for authentic Ethiopian cuisine', 'font-size: 14px; color: #8B0000;');
console.log('%cReservations: +49 341 24831144', 'font-size: 12px; color: #2D5016;');

// === ERROR HANDLING ===
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// === PERFORMANCE MONITORING ===
window.addEventListener('load', () => {
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${pageLoadTime}ms`);
    }
});
