// Cache Management
document.addEventListener('DOMContentLoaded', () => {
    const currentVersion = document.querySelector('meta[name="version"]').content;
    const cachedVersion = localStorage.getItem('siteVersion');
    if (cachedVersion !== currentVersion) {
        localStorage.setItem('siteVersion', currentVersion);
        if ('caches' in window) {
            caches.keys().then(names => names.forEach(name => caches.delete(name)));
        }
        window.location.reload(true);
    }
});

// Language Toggle
document.getElementById('languageToggle').addEventListener('click', () => {
    document.querySelectorAll('[data-chinese], [data-english]').forEach(el => {
        el.textContent = el.textContent === el.dataset.chinese ? el.dataset.english : el.dataset.chinese;
    });
});

// Default Language
document.addEventListener('DOMContentLoaded', () => {
    const userLang = navigator.language || navigator.userLanguage;
    document.querySelectorAll('[data-chinese], [data-english]').forEach(el => {
        el.textContent = userLang.startsWith('zh') ? el.dataset.chinese : el.dataset.english;
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Form Submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('mc-embedded-subscribe-form');
    const emailInput = document.getElementById('mce-EMAIL');
    emailInput.addEventListener('keypress', e => {
        if (e.key === 'Enter' && emailInput.checkValidity()) {
            e.preventDefault();
            form.submit();
        }
    });
});