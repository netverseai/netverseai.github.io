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

// Safari 图片加载修复
document.addEventListener('DOMContentLoaded', () => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const banner = document.querySelector('.banner');
    const bannerImg = new Image();
    
    // 预加载背景图片
    bannerImg.src = './images/netverse_banner.jpeg';
    
    bannerImg.onload = () => {
        console.log('Banner image loaded successfully');
    };
    
    bannerImg.onerror = () => {
        console.log('Banner image failed to load, showing fallback');
        // 如果图片加载失败，显示备用图片
        const fallback = document.querySelector('.banner-image-fallback');
        if (fallback) {
            fallback.style.display = 'block';
            banner.style.backgroundImage = 'none';
        }
    };
    
    // Safari 特定处理
    if (isSafari) {
        console.log('Safari detected, applying special handling');
        banner.style.backgroundAttachment = 'scroll';
        banner.style.webkitBackfaceVisibility = 'hidden';
        banner.style.backfaceVisibility = 'hidden';
        
        // 强制重绘
        setTimeout(() => {
            banner.style.display = 'none';
            banner.offsetHeight; // 触发重排
            banner.style.display = 'flex';
        }, 100);
    }
});