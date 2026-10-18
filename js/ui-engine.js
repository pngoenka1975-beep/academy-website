window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('intro-splash');
        if (splash) {
            splash.classList.add('opacity-0', 'pointer-events-none');
            setTimeout(() => splash.remove(), 700);
        }
    }, 1800);
});

setTimeout(() => {
    const splash = document.getElementById('intro-splash');
    if (splash) {
        splash.classList.add('opacity-0', 'pointer-events-none');
        setTimeout(() => splash.remove(), 500);
    }
}, 3500);

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('hamburger-icon');
    menu.classList.toggle('hidden');
    if(menu.classList.contains('hidden')) {
        icon.className = 'fa-solid fa-bars';
    } else {
        icon.className = 'fa-solid fa-xmark';
    }
}

function toggleTheme() {
    const html = document.documentElement;
    const icon = document.getElementById('theme-icon');
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        html.classList.add('light');
        icon.className = 'fa-solid fa-sun';
        localStorage.setItem('risingstarz_theme', 'light');
    } else {
        html.classList.remove('light');
        html.classList.add('dark');
        icon.className = 'fa-solid fa-moon';
        localStorage.setItem('risingstarz_theme', 'dark');
    }
}

if (localStorage.getItem('risingstarz_theme') === 'light') {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    const icon = document.getElementById('theme-icon');
    if(icon) icon.className = 'fa-solid fa-sun';
}

// HERO CAROUSEL ENGINE
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');

function setSlide(index) {
    if(!slides.length) return;
    slides[currentSlide].classList.add('opacity-0', 'pointer-events-none');
    slides[currentSlide].classList.remove('opacity-100');
    if(dots[currentSlide]) dots[currentSlide].classList.replace('opacity-100', 'opacity-40');

    currentSlide = index;

    slides[currentSlide].classList.remove('opacity-0', 'pointer-events-none');
    slides[currentSlide].classList.add('opacity-100');
    if(dots[currentSlide]) dots[currentSlide].classList.replace('opacity-40', 'opacity-100');
}

function nextSlide() { if(slides.length) setSlide((currentSlide + 1) % slides.length); }
function prevSlide() { if(slides.length) setSlide((currentSlide - 1 + slides.length) % slides.length); }
setInterval(nextSlide, 5000);

// REVIEWS CAROUSEL
let currentReview = 0;
const reviewSlides = document.querySelectorAll('.review-slide');

function setReview(index) {
    if(!reviewSlides.length) return;
    reviewSlides[currentReview].classList.add('hidden');
    reviewSlides[currentReview].classList.remove('block');

    currentReview = index;

    reviewSlides[currentReview].classList.remove('hidden');
    reviewSlides[currentReview].classList.add('block');
}

function nextReview() { if(reviewSlides.length) setReview((currentReview + 1) % reviewSlides.length); }
function prevReview() { if(reviewSlides.length) setReview((currentReview - 1 + reviewSlides.length) % reviewSlides.length); }
setInterval(nextReview, 4000);

// FUNCTIONAL VIDEO MODAL PLAYER
function openVideoModal(title, embedUrl) {
    document.getElementById('video-modal-title').innerText = title;
    document.getElementById('video-modal-iframe').src = embedUrl;
    document.getElementById('video-modal').classList.remove('hidden');
}

function closeVideoModal() {
    document.getElementById('video-modal').classList.add('hidden');
    document.getElementById('video-modal-iframe').src = '';
}

// COURSE PRODUCT DETAIL MODAL ENGINE
function openCourseModal(title, badge, fee, desc, subjects, features) {
    document.getElementById('modal-course-title').innerText = title;
    document.getElementById('modal-course-badge').innerText = badge;
    document.getElementById('modal-course-fee').innerText = fee;
    document.getElementById('modal-course-desc').innerText = desc;

    const subjectsContainer = document.getElementById('modal-course-subjects');
    subjectsContainer.innerHTML = '';
    subjects.forEach(sub => {
        const subItem = document.createElement('div');
        subItem.className = 'p-2.5 rounded-xl theme-card border flex items-center gap-2';
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-book-bookmark text-brand-400';
        const span = document.createElement('span');
        span.textContent = sub;
        subItem.appendChild(icon);
        subItem.appendChild(span);
        subjectsContainer.appendChild(subItem);
    });

    const featuresContainer = document.getElementById('modal-course-features');
    featuresContainer.innerHTML = '';
    features.forEach(feat => {
        const featItem = document.createElement('p');
        featItem.className = 'flex items-center gap-2 theme-text-muted';
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-circle-check text-red-400';
        const span = document.createElement('span');
        span.textContent = feat;
        featItem.appendChild(icon);
        featItem.appendChild(span);
        featuresContainer.appendChild(featItem);
    });

    document.getElementById('course-product-modal').classList.remove('hidden');
}

function closeCourseModal() {
    document.getElementById('course-product-modal').classList.add('hidden');
}

// TAP FILTERS FOR CENTERS SECTION
function filterCenters(city) {
    const cards = document.querySelectorAll('.center-card');
    const buttons = document.querySelectorAll('.center-filter-btn');

    buttons.forEach(btn => {
        btn.className = 'center-filter-btn px-4 py-2 rounded-xl text-xs font-bold theme-card hover:bg-brand-500/10';
    });

    const activeBtn = document.getElementById('center-btn-' + city);
    if(activeBtn) {
        activeBtn.className = 'center-filter-btn px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 text-white shadow-md';
    }

    cards.forEach(card => {
        if(city === 'all' || card.classList.contains(city)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// GALLERY LIGHTBOX & FILTERING
function filterGallery(category) {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        if(category === 'all' || item.classList.contains(category)) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}

let currentActivePhotoUrl = "";
let currentActivePhotoTitle = "";

function openGalleryLightbox(title, src) {
    currentActivePhotoUrl = src;
    currentActivePhotoTitle = title;
    document.getElementById('lightbox-title').innerText = title;
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox-download-link').href = src;
    document.getElementById('gallery-lightbox-modal').classList.remove('hidden');
}

function closeGalleryLightbox() {
    document.getElementById('gallery-lightbox-modal').classList.add('hidden');
}

function shareGalleryPhoto() {
    if (navigator.share) {
        navigator.share({
            title: currentActivePhotoTitle,
            text: 'Check out this photo from Rising Starz!',
            url: window.location.href,
        }).then(() => showToast('Shared successfully!'))
          .catch(() => showToast('Share cancelled.'));
    } else {
        navigator.clipboard.writeText(window.location.href);
        showToast('Page link copied to clipboard!');
    }
}

// AGENT FAQ KNOWLEDGE BASE
const faqKnowledge = [
    {
        keywords: ['fee', 'fees', 'cost', 'charge', 'price', 'money', 'scholarship', 'discount'],
        response: "💰 Rising Starz Fee Details:\n• Class 6th-10th: ₹25,000 - ₹45,000 / year\n• JEE Main & Adv: ₹85,000 / year\n• NEET Medical: ₹90,000 / year"
    },
    {
        keywords: ['timing', 'timings', 'time', 'batch', 'batches', 'schedule', 'hours', 'slot'],
        response: "⏰ Batch Timings & Options:\n• Morning Batch: 7:30 AM – 11:30 AM\n• Evening Batch: 4:00 PM – 8:00 PM\n• Weekend Integrated: Sat & Sun (8 AM – 2 PM)"
    },
    {
        keywords: ['result', 'results', 'rank', 'ranks', 'topper', 'toppers', 'success', 'ratio', 'selection'],
        response: "🏆 Success Ratio & Results:\n• JEE Advanced: 450+ selections in top IITs with AIR 42 top rank.\n• NEET UG: 98.2% qualification rate with top score 705/720."
    },
    {
        keywords: ['center', 'centers', 'location', 'locations', 'address', 'branch', 'kota', 'delhi'],
        response: "📍 Major Offline Centers:\n• Kota Campus: Vigyan Nagar, Near City Mall.\n• Delhi NCR: Kalu Sarai, Near Hauz Khas Metro.\nVisit our Centers tab to filter and see full address details!"
    }
];

function toggleAgentWindow() { document.getElementById('agent-chat-window').classList.toggle('hidden'); }

function appendUserMessage(text) {
    const container = document.getElementById('agent-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'flex justify-end';
    const bubble = document.createElement('div');
    bubble.className = 'bg-brand-600 text-white p-2.5 rounded-2xl rounded-tr-none max-w-[80%]';
    bubble.textContent = text;
    msgDiv.appendChild(bubble);
    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
}

function appendBotMessage(text) {
    const container = document.getElementById('agent-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'flex gap-2.5';

    const avatar = document.createElement('div');
    avatar.className = 'w-7 h-7 rounded-lg bg-brand-600 text-white flex items-center justify-center shrink-0';
    avatar.innerHTML = '<i class="fa-solid fa-robot text-xs"></i>';

    const bubble = document.createElement('div');
    bubble.className = 'theme-card p-3 rounded-2xl rounded-tl-none max-w-[85%] space-y-1';

    text.split('\n').forEach((line, idx) => {
        const lineDiv = document.createElement('div');
        lineDiv.textContent = line;
        if (idx > 0) lineDiv.className = 'mt-1';
        bubble.appendChild(lineDiv);
    });

    msgDiv.appendChild(avatar);
    msgDiv.appendChild(bubble);
    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
}

function processAgentQuery(queryText) {
    const textLower = queryText.toLowerCase();
    let matchedResponse = null;

    for (const item of faqKnowledge) {
        if (item.keywords.some(kw => textLower.includes(kw))) {
            matchedResponse = item.response;
            break;
        }
    }

    if (!matchedResponse) {
        matchedResponse = "I'm sorry, I couldn't quite understand your question. 😊 You can ask me about class timings, fees, attendance, homework, tests, results, or other class-related information. Please try rephrasing your question, and I'll do my best to help!";
    }

    setTimeout(() => { appendBotMessage(matchedResponse); }, 300);
}

function handleAgentSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('agent-input');
    const val = input.value.trim();
    if (!val) return;

    appendUserMessage(val);
    input.value = '';
    processAgentQuery(val);
}

function sendQuickKeyword(kw) {
    appendUserMessage("Show info regarding " + kw);
    processAgentQuery(kw);
}

// MODALS & NAVIGATION

function openAuthModal(mode) {
    document.getElementById('auth-modal').classList.remove('hidden');
    document.getElementById('login-error').classList.add('hidden');
    document.getElementById('register-error').classList.add('hidden');
    document.getElementById('forgot-error').classList.add('hidden');
    document.getElementById('forgot-success').classList.add('hidden');
    switchAuthMode(mode);
}
function closeAuthModal() { document.getElementById('auth-modal').classList.add('hidden'); }
function switchAuthMode(mode) {
    document.getElementById('login-error').classList.add('hidden');
    document.getElementById('register-error').classList.add('hidden');
    document.getElementById('forgot-error').classList.add('hidden');
    document.getElementById('forgot-success').classList.add('hidden');
    if(mode === 'login') {
        document.getElementById('form-login').classList.remove('hidden');
        document.getElementById('form-register').classList.add('hidden');
        document.getElementById('form-forgot').classList.add('hidden');
        document.getElementById('auth-tab-login').className = 'text-lg font-extrabold text-brand-400 border-b-2 border-brand-500 pb-1';
        document.getElementById('auth-tab-reg').className = 'text-lg font-extrabold theme-text-muted pb-1';
        document.getElementById('auth-tab-forgot').className = 'text-lg font-extrabold theme-text-muted pb-1';
    } else if(mode === 'forgot') {
        document.getElementById('form-login').classList.add('hidden');
        document.getElementById('form-register').classList.add('hidden');
        document.getElementById('form-forgot').classList.remove('hidden');
        document.getElementById('auth-tab-forgot').className = 'text-lg font-extrabold text-brand-400 border-b-2 border-brand-500 pb-1';
        document.getElementById('auth-tab-login').className = 'text-lg font-extrabold theme-text-muted pb-1';
        document.getElementById('auth-tab-reg').className = 'text-lg font-extrabold theme-text-muted pb-1';
    } else {
        document.getElementById('form-login').classList.add('hidden');
        document.getElementById('form-register').classList.remove('hidden');
        document.getElementById('form-forgot').classList.add('hidden');
        document.getElementById('auth-tab-reg').className = 'text-lg font-extrabold text-brand-400 border-b-2 border-brand-500 pb-1';
        document.getElementById('auth-tab-login').className = 'text-lg font-extrabold theme-text-muted pb-1';
        document.getElementById('auth-tab-forgot').className = 'text-lg font-extrabold theme-text-muted pb-1';
    }
}
function toggleUserDropdown() { document.getElementById('user-dropdown').classList.toggle('hidden'); }
    
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById('tab-' + tabId).classList.remove('hidden');
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('nav-btn-active');
        btn.classList.add('theme-text-muted');
    });

    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
        btn.classList.remove('nav-btn-active');
        btn.classList.add('theme-text-muted');
    });

    const activeDesktopBtn = document.getElementById('nav-' + tabId);
    if(activeDesktopBtn) {
        activeDesktopBtn.classList.add('nav-btn-active');
        activeDesktopBtn.classList.remove('theme-text-muted');
    }

    const activeMobileBtn = document.getElementById('mobile-nav-' + tabId);
    if(activeMobileBtn) {
        activeMobileBtn.classList.add('nav-btn-active');
        activeMobileBtn.classList.remove('theme-text-muted');
    }

    if(tabId === 'contact' && !window.mapInitialized) {
        initMap();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.mapInitialized = false;
function initMap() {
    window.mapInitialized = true;
    setTimeout(() => {
        const map = L.map('map').setView([28.5456, 77.1928], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        L.marker([28.5456, 77.1928]).addTo(map)
            .bindPopup('<b>Rising Starz HQ</b><br>Kalu Sarai, New Delhi.')
            .openPopup();
    }, 200);
}

function showToast(msg, type = 'info') {
    const toast = document.createElement('div');
    const typeColors = {
        success: 'bg-emerald-600 text-white',
        error: 'bg-red-600 text-white',
        info: 'bg-brand-600 text-white'
    };
    toast.className = 'px-4 py-3 rounded-xl ' + (typeColors[type] || typeColors.info) + ' text-xs font-bold shadow-xl';
    toast.innerText = msg;
    document.getElementById('toast-container').appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
}

function getFirebaseAuthErrorMessage(code) {
    const errorMap = {
        'auth/user-not-found': 'No account found with this email.',
        'auth/wrong-password': 'Incorrect password.',
        'auth/invalid-email': 'Invalid email address.',
        'auth/email-already-in-use': 'An account already exists with this email.',
        'auth/weak-password': 'Password is too weak (min 6 characters).',
        'auth/too-many-requests': 'Too many failed attempts. Try again later.',
        'auth/network-request-failed': 'Network error. Check your internet connection.',
        'auth/invalid-credential': 'Invalid email or password.',
        'auth/popup-closed-by-user': 'Sign-in popup was closed.',
        'auth/cancelled-popup-request': 'Sign-in was cancelled.'
    };
    return errorMap[code] || 'An unexpected error occurred. Please try again.';
}

// Close modals on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const authModal = document.getElementById('auth-modal');
        const searchModal = document.getElementById('search-modal');
        if (authModal && !authModal.classList.contains('hidden')) {
            closeAuthModal();
        }
        if (searchModal && !searchModal.classList.contains('hidden')) {
            closeSearchModal();
        }
    }
});
