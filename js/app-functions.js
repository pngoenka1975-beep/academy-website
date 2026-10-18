// Contact form submission handler
function handleContactSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const phone = document.getElementById('contact-phone').value;
    const message = document.getElementById('contact-message').value;

    if (!name || !email || !message) {
        showToast('Please fill in all required fields.', 'error');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
    }

    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    btn.innerText = 'Sending...';
    btn.disabled = true;

    // TODO: Replace with your deployed Google Apps Script web app URL
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzNDEVtzfGIRkvNffChDlRj83AcEF5B3K-9d9uEa-4pn3H60YyJOE3GfRiHiMXrIWTy/exec';

    fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            name: name,
            email: email,
            phone: phone,
            course: document.getElementById('contact-course').value,
            message: message,
            timestamp: new Date().toISOString()
        })
    })
        .then((response) => response.json())
        .then((data) => {
            btn.innerText = originalText;
            btn.disabled = false;
            if (data.status === 'success') {
                showToast('Inquiry submitted successfully! We will contact you soon.', 'success');
                e.target.reset();
            } else {
                showToast(data.message || 'Submission failed. Please try again.', 'error');
            }
        })
        .catch((error) => {
            console.error('Contact form error:', error);
            btn.innerText = originalText;
            btn.disabled = false;
            showToast('Network error. Please try again later.', 'error');
        });
}

// Map initialization error handling
window.initMap = function() {
    try {
        window.mapInitialized = true;
        setTimeout(() => {
            if (typeof L === 'undefined') {
                showToast('Map service unavailable. Please try again later.', 'error');
                return;
            }
            const map = L.map('map').setView([28.5456, 77.1928], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            L.marker([28.5456, 77.1928]).addTo(map)
                .bindPopup('<b>Rising Starz HQ</b><br>Kalu Sarai, New Delhi.')
                .openPopup();
        }, 200);
    } catch (error) {
        showToast('Failed to load map. Please refresh the page.', 'error');
    }
};

// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    showToast('An unexpected error occurred. Please refresh the page.', 'error');
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled rejection:', event.reason);
    showToast('A network or processing error occurred. Please try again.', 'error');
});

// Image error handling - replace broken images with placeholder
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/400x300/1e3a8a/ffffff?text=Image+Unavailable';
            this.alt = 'Image unavailable';
        });
    });
});

// PDF download error handling
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[download]').forEach(link => {
        link.addEventListener('click', function(e) {
            const url = this.href;
            fetch(url, { method: 'HEAD' })
                .then(response => {
                    if (!response.ok) {
                        e.preventDefault();
                        showToast('This file is not available yet. Please contact admin.', 'error');
                    }
                })
                .catch(() => {
                    e.preventDefault();
                    showToast('Failed to load file. Please try again later.', 'error');
                });
        });
    });
});

// Search modal functions
const searchIndex = [
    // Blogs
    {
        id: 'blog-neet',
        title: 'NEET 700+ Strategy: Complete Preparation Guide',
        type: 'Blog',
        icon: 'fa-stethoscope',
        url: 'blog-neet-strategy.html',
        excerpt: 'Master NCERT biology, chemistry, and physics with our proven strategy to score 700+ in NEET UG 2026.',
        keywords: ['neet', 'strategy', '700', 'preparation', 'guide', 'medical', 'biology', 'ncert', 'blog']
    },
    {
        id: 'blog-jee-physics',
        title: 'IIT-JEE Advanced Physics: Mechanics & Electrodynamics',
        type: 'Blog',
        icon: 'fa-atom',
        url: 'blogs/blog-jee-physics.html',
        excerpt: 'Deep dive into high-weightage physics topics with solved examples and previous year questions.',
        keywords: ['jee', 'advanced', 'physics', 'mechanics', 'electrodynamics', 'blog']
    },
    {
        id: 'blog-chemistry',
        title: 'Organic Chemistry Mastery for JEE Main & Advanced',
        type: 'Blog',
        icon: 'fa-flask',
        url: 'blogs/blog-chemistry.html',
        excerpt: 'Reaction mechanisms, named reactions, and shortcut techniques to ace organic chemistry.',
        keywords: ['organic', 'chemistry', 'jee', 'main', 'advanced', 'reaction', 'mechanism', 'blog']
    },
    // PYQs
    {
        id: 'pyq-jee-main-2024',
        title: 'JEE Main 2024 Previous Year Paper',
        type: 'PYQ',
        icon: 'fa-download',
        url: 'pyqs/jee-main-2024.pdf',
        excerpt: 'JEE Main 2024 question paper with solutions - download PDF',
        keywords: ['jee main', '2024', 'pyq', 'previous year', 'paper', 'pdf', 'download']
    },
    {
        id: 'pyq-jee-main-2023',
        title: 'JEE Main 2023 Previous Year Paper',
        type: 'PYQ',
        icon: 'fa-download',
        url: 'pyqs/jee-main-2023.pdf',
        excerpt: 'JEE Main 2023 question paper with solutions - download PDF',
        keywords: ['jee main', '2023', 'pyq', 'previous year', 'paper', 'pdf', 'download']
    },
    {
        id: 'pyq-jee-main-sample',
        title: 'JEE Main Sample Practice Paper',
        type: 'PYQ',
        icon: 'fa-download',
        url: 'pyqs/jee-main-sample.pdf',
        excerpt: 'JEE Main sample practice paper - download PDF',
        keywords: ['jee main', 'sample', 'practice', 'paper', 'pdf', 'download']
    },
    {
        id: 'pyq-neet-2024',
        title: 'NEET 2024 Previous Year Paper',
        type: 'PYQ',
        icon: 'fa-download',
        url: 'pyqs/neet-2024.pdf',
        excerpt: 'NEET UG 2024 question paper with solutions - download PDF',
        keywords: ['neet', '2024', 'pyq', 'previous year', 'paper', 'pdf', 'download']
    },
    {
        id: 'pyq-neet-2023',
        title: 'NEET 2023 Previous Year Paper',
        type: 'PYQ',
        icon: 'fa-download',
        url: 'pyqs/neet-2023.pdf',
        excerpt: 'NEET UG 2023 question paper with solutions - download PDF',
        keywords: ['neet', '2023', 'pyq', 'previous year', 'paper', 'pdf', 'download']
    },
    {
        id: 'pyq-neet-sample',
        title: 'NEET Sample Practice Paper',
        type: 'PYQ',
        icon: 'fa-download',
        url: 'pyqs/neet-sample.pdf',
        excerpt: 'NEET sample practice paper - download PDF',
        keywords: ['neet', 'sample', 'practice', 'paper', 'pdf', 'download']
    },
    {
        id: 'pyq-jee-adv-2024',
        title: 'JEE Advanced 2024 Previous Year Paper',
        type: 'PYQ',
        icon: 'fa-download',
        url: 'pyqs/jee-advanced-2024.pdf',
        excerpt: 'JEE Advanced 2024 question paper with solutions - download PDF',
        keywords: ['jee advanced', '2024', 'pyq', 'previous year', 'paper', 'pdf', 'download']
    },
    {
        id: 'pyq-jee-adv-2023',
        title: 'JEE Advanced 2023 Previous Year Paper',
        type: 'PYQ',
        icon: 'fa-download',
        url: 'pyqs/jee-advanced-2023.pdf',
        excerpt: 'JEE Advanced 2023 question paper with solutions - download PDF',
        keywords: ['jee advanced', '2023', 'pyq', 'previous year', 'paper', 'pdf', 'download']
    },
    {
        id: 'pyq-jee-adv-sample',
        title: 'JEE Advanced Sample Practice Paper',
        type: 'PYQ',
        icon: 'fa-download',
        url: 'pyqs/jee-advanced-sample.pdf',
        excerpt: 'JEE Advanced sample practice paper - download PDF',
        keywords: ['jee advanced', 'sample', 'practice', 'paper', 'pdf', 'download']
    },
    // Notes
    {
        id: 'notes-physics-chapter',
        title: 'Physics Chapter-wise Study Notes',
        type: 'Notes',
        icon: 'fa-microscope',
        url: 'notes/physics-chapterwise.pdf',
        excerpt: 'Mechanics, Thermodynamics, Electrodynamics, Optics, Modern Physics - chapter-wise notes PDF',
        keywords: ['physics', 'notes', 'chapter', 'wise', 'mechanics', 'thermodynamics', 'pdf', 'download']
    },
    {
        id: 'notes-physics-formula',
        title: 'Physics Formula Sheet',
        type: 'Notes',
        icon: 'fa-calculator',
        url: 'notes/physics-formulae.pdf',
        excerpt: 'Quick physics formula reference guide for JEE & NEET - download PDF',
        keywords: ['physics', 'formula', 'sheet', 'reference', 'jee', 'neet', 'pdf', 'download']
    },
    {
        id: 'notes-physics-pyq',
        title: 'Physics PYQ Compilation',
        type: 'Notes',
        icon: 'fa-file-lines',
        url: 'notes/physics-pyq-compilation.pdf',
        excerpt: 'Physics previous year questions compilation with answers - download PDF',
        keywords: ['physics', 'pyq', 'previous year', 'questions', 'compilation', 'pdf', 'download']
    },
    {
        id: 'notes-chemistry-chapter',
        title: 'Chemistry Chapter-wise Study Notes',
        type: 'Notes',
        icon: 'fa-flask',
        url: 'notes/chemistry-chapterwise.pdf',
        excerpt: 'Physical, Organic, Inorganic Chemistry - chapter-wise notes PDF',
        keywords: ['chemistry', 'notes', 'chapter', 'wise', 'physical', 'organic', 'inorganic', 'pdf', 'download']
    },
    {
        id: 'notes-chemistry-mech',
        title: 'Organic Chemistry Reaction Mechanisms',
        type: 'Notes',
        icon: 'fa-flask',
        url: 'notes/chemistry-mechanisms.pdf',
        excerpt: 'Named reactions and organic mechanisms - download PDF',
        keywords: ['chemistry', 'organic', 'reaction', 'mechanism', 'named', 'pdf', 'download']
    },
    {
        id: 'notes-chemistry-inorganic',
        title: 'Inorganic Chemistry Notes',
        type: 'Notes',
        icon: 'fa-file-lines',
        url: 'notes/chemistry-inorganic.pdf',
        excerpt: 'Periodic table, coordination compounds, inorganic chemistry notes - download PDF',
        keywords: ['chemistry', 'inorganic', 'periodic', 'table', 'notes', 'pdf', 'download']
    },
    {
        id: 'notes-maths-chapter',
        title: 'Mathematics Chapter-wise Study Notes',
        type: 'Notes',
        icon: 'fa-calculator',
        url: 'notes/mathematics-chapterwise.pdf',
        excerpt: 'Calculus, Algebra, Coordinate Geometry, Vectors - chapter-wise notes PDF',
        keywords: ['mathematics', 'maths', 'notes', 'chapter', 'calculus', 'algebra', 'pdf', 'download']
    },
    {
        id: 'notes-maths-calculus',
        title: 'Calculus Notes',
        type: 'Notes',
        icon: 'fa-calculator',
        url: 'notes/mathematics-calculus.pdf',
        excerpt: 'Limits, derivatives, integrals calculus notes - download PDF',
        keywords: ['calculus', 'limits', 'derivatives', 'integrals', 'mathematics', 'pdf', 'download']
    },
    {
        id: 'notes-maths-algebra',
        title: 'Algebra Notes',
        type: 'Notes',
        icon: 'fa-file-lines',
        url: 'notes/mathematics-algebra.pdf',
        excerpt: 'Quadratic equations, complex numbers algebra notes - download PDF',
        keywords: ['algebra', 'quadratic', 'complex', 'numbers', 'mathematics', 'pdf', 'download']
    },
    {
        id: 'notes-biology-chapter',
        title: 'Biology Chapter-wise Study Notes',
        type: 'Notes',
        icon: 'fa-dna',
        url: 'notes/biology-chapterwise.pdf',
        excerpt: 'Botany & Zoology NCERT based chapter-wise notes - download PDF',
        keywords: ['biology', 'notes', 'chapter', 'wise', 'botany', 'zoology', 'ncert', 'pdf', 'download']
    },
    {
        id: 'notes-biology-diagrams',
        title: 'Biology Important Diagrams',
        type: 'Notes',
        icon: 'fa-dna',
        url: 'notes/biology-diagrams.pdf',
        excerpt: 'Important biology diagrams collection for NEET - download PDF',
        keywords: ['biology', 'diagrams', 'neet', 'important', 'collection', 'pdf', 'download']
    },
    {
        id: 'notes-biology-pyq',
        title: 'Biology PYQ Compilation',
        type: 'Notes',
        icon: 'fa-file-lines',
        url: 'notes/biology-pyq-compilation.pdf',
        excerpt: 'Last 10 years chapter-wise biology PYQs - download PDF',
        keywords: ['biology', 'pyq', 'previous year', 'questions', 'compilation', 'neet', 'pdf', 'download']
    }
];

function toggleSearchModal() {
    const modal = document.getElementById('search-modal');
    if (!modal) return;
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        const input = document.getElementById('search-input');
        if (input) input.focus();
    } else {
        closeSearchModal();
    }
}

function closeSearchModal() {
    const modal = document.getElementById('search-modal');
    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');
    const empty = document.getElementById('search-empty');
    if (modal) modal.classList.add('hidden');
    if (input) input.value = '';
    if (results) results.innerHTML = '';
    if (empty) empty.classList.add('hidden');
}

function performSearch() {
    const input = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results');
    const emptyContainer = document.getElementById('search-empty');

    if (!input || !resultsContainer || !emptyContainer) return;

    const query = input.value.toLowerCase().trim();

    if (!query) {
        resultsContainer.innerHTML = '';
        emptyContainer.classList.add('hidden');
        return;
    }

    if (typeof searchIndex === 'undefined') {
        resultsContainer.innerHTML = '';
        emptyContainer.classList.add('hidden');
        return;
    }

    const results = searchIndex.filter(item => {
        return item.keywords.some(kw => kw.includes(query)) ||
               item.title.toLowerCase().includes(query) ||
               item.excerpt.toLowerCase().includes(query);
    });

    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        emptyContainer.classList.remove('hidden');
        return;
    }

    emptyContainer.classList.add('hidden');

    results.forEach(item => {
        const resultEl = document.createElement('div');
        resultEl.className = 'p-4 rounded-2xl theme-card border hover:border-brand-500 transition cursor-pointer group';
        resultEl.onclick = () => {
            if (item.url.endsWith('.pdf')) {
                window.open(item.url, '_blank');
            } else {
                window.location.href = item.url;
            }
            closeSearchModal();
        };
        const typeBadge = document.createElement('span');
        typeBadge.className = 'px-2 py-0.5 rounded text-[10px] font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/20';
        typeBadge.textContent = item.type;

        const typeLabel = document.createElement('span');
        typeLabel.className = 'text-xs theme-text-muted group-hover:text-brand-400 transition';
        typeLabel.textContent = item.type === 'PYQ' || item.type === 'Notes' ? 'Download PDF' : 'Read Article';

        const typeRow = document.createElement('div');
        typeRow.className = 'flex items-center justify-between mb-2';
        typeRow.appendChild(typeBadge);
        typeRow.appendChild(typeLabel);

        const iconDiv = document.createElement('div');
        iconDiv.className = 'w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center mb-3';
        const icon = document.createElement('i');
        icon.className = `fa-solid ${item.icon} text-[12px] text-brand-400`;
        iconDiv.appendChild(icon);

        const titleEl = document.createElement('h4');
        titleEl.className = 'font-bold text-white text-sm mb-1 group-hover:text-brand-400 transition';
        titleEl.textContent = item.title;

        const excerptEl = document.createElement('p');
        excerptEl.className = 'text-xs theme-text-muted leading-relaxed';
        excerptEl.textContent = item.excerpt;

        resultEl.appendChild(typeRow);
        resultEl.appendChild(iconDiv);
        resultEl.appendChild(titleEl);
        resultEl.appendChild(excerptEl);
        resultsContainer.appendChild(resultEl);
    });
}
