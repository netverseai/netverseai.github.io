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
    const currentLang = document.querySelector('[data-chinese]').textContent === document.querySelector('[data-chinese]').dataset.chinese ? 'zh' : 'en';
    localStorage.setItem('preferredLanguage', currentLang);
});

// Default Language
document.addEventListener('DOMContentLoaded', () => {
    const userLang = localStorage.getItem('preferredLanguage') || navigator.language || navigator.userLanguage;
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

    // 处理移动端虚拟键盘的 "go" 按钮事件
    emailInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' || event.keyCode === 13) {
            event.preventDefault();
            if (emailInput.checkValidity()) {
                form.submit();
            }
        }
    });

    // 处理表单提交事件
    form.addEventListener('submit', function(event) {
        if (!emailInput.checkValidity()) {
            event.preventDefault();
        }
    });
});