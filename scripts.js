// Cache Management
function initializeCacheManagement() {
    const versionMeta = document.querySelector('meta[name="version"]');
    if (!versionMeta) {
        // Meta tag not yet loaded, try again later
        return false;
    }
    
    const currentVersion = versionMeta.content;
    const cachedVersion = localStorage.getItem('siteVersion');
    if (cachedVersion !== currentVersion) {
        localStorage.setItem('siteVersion', currentVersion);
        if ('caches' in window) {
            caches.keys().then(names => names.forEach(name => caches.delete(name)));
        }
        window.location.reload(true);
    }
    return true;
}

// Try to initialize cache management immediately and also on DOMContentLoaded
initializeCacheManagement();
document.addEventListener('DOMContentLoaded', initializeCacheManagement);

// Language Management System
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('preferredLanguage') || this.detectBrowserLanguage();
        this.translations = {};
        this.init();
    }

    async init() {
        await this.loadTranslations(this.currentLang);
        this.updateUI();
        this.setupEventListeners();
    }

    detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const langMap = {
            'zh-CN': 'zh-cn',
            'zh-TW': 'zh-tw',
            'zh': 'zh-cn',
            'en': 'en',
            'en-US': 'en',
            'en-GB': 'en',
            'ja': 'ja',
            'ja-JP': 'ja',
            'de': 'de',
            'de-DE': 'de'
        };
        return langMap[browserLang] || 'zh-cn';
    }

    async loadTranslations(lang) {
        try {
            const response = await fetch(`lang/${lang}.json`);
            this.translations = await response.json();
        } catch (error) {
            console.error('Failed to load translations:', error);
            // Fallback to Chinese if translation fails
            const response = await fetch('lang/zh-cn.json');
            this.translations = await response.json();
        }
    }

    updateUI() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (this.translations[key]) {
                el.textContent = this.translations[key];
            }
        });

        // Update all elements with data-i18n-placeholder attribute
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (this.translations[key]) {
                el.placeholder = this.translations[key];
            }
        });

        // Update language selector text - always update regardless of current content
        this.updateLanguageSelector();
    }

    updateLanguageSelector() {
        const currentLangElement = document.querySelector('.current-lang');
        if (currentLangElement) {
            const langNames = {
                'zh-cn': '简体中文',
                'zh-tw': '繁體中文',
                'en': 'English',
                'ja': '日本語',
                'de': 'Deutsch'
            };
            currentLangElement.textContent = langNames[this.currentLang] || '简体中文';
        }

        // Update active language in dropdown
        document.querySelectorAll('.dropdown-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-lang') === this.currentLang) {
                item.classList.add('active');
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLang;
    }

    // Method to update UI for newly loaded dynamic content
    updateDynamicContent(container) {
        // Update all elements with data-i18n attribute within the container
        container.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (this.translations[key]) {
                el.textContent = this.translations[key];
            }
        });

        // Update all elements with data-i18n-placeholder attribute within the container
        container.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (this.translations[key]) {
                el.placeholder = this.translations[key];
            }
        });

        // Update language selector in the newly loaded content
        this.updateLanguageSelector();

        // Re-setup event listeners for new dropdown items
        container.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', async (e) => {
                e.preventDefault();
                const newLang = item.getAttribute('data-lang');
                if (newLang !== this.currentLang) {
                    await this.switchLanguage(newLang);
                }
            });
        });
    }

    setupEventListeners() {
        // Language dropdown item clicks
        document.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', async (e) => {
                e.preventDefault();
                const newLang = item.getAttribute('data-lang');
                if (newLang !== this.currentLang) {
                    await this.switchLanguage(newLang);
                }
            });
        });
    }

    async switchLanguage(newLang) {
        this.currentLang = newLang;
        localStorage.setItem('preferredLanguage', newLang);
        await this.loadTranslations(newLang);
        this.updateUI();
    }
}

// Initialize language manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
});

// Legacy language toggle for backward compatibility (can be removed if not needed)
document.getElementById('languageToggle')?.addEventListener('click', () => {
    document.querySelectorAll('[data-chinese], [data-english]').forEach(el => {
        el.textContent = el.textContent === el.dataset.chinese ? el.dataset.english : el.dataset.chinese;
    });
    const currentLang = document.querySelector('[data-chinese]').textContent === document.querySelector('[data-chinese]').dataset.chinese ? 'zh' : 'en';
    localStorage.setItem('preferredLanguage', currentLang);
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Form Submission (handles both static and dynamically loaded forms)
function initializeFormSubmission() {
    const form = document.getElementById('mc-embedded-subscribe-form');
    const emailInput = document.getElementById('mce-EMAIL');

    if (!form || !emailInput) {
        // Form not yet loaded, try again later
        return false;
    }

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

    return true;
}

// Try to initialize form immediately and also on DOMContentLoaded
initializeFormSubmission();
document.addEventListener('DOMContentLoaded', initializeFormSubmission);

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