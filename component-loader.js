/**
 * Component Loader
 * Dynamically loads HTML components into pages
 */
class ComponentLoader {
    constructor() {
        this.components = {};
    }

    /**
     * Load a component and insert it into the specified element
     * @param {string} componentPath - Path to the component HTML file
     * @param {string} targetSelector - CSS selector for the target element
     * @param {string} position - Insert position: 'replace', 'beforebegin', 'afterbegin', 'beforeend', 'afterend'
     * @returns {Promise<void>}
     */
    async loadComponent(componentPath, targetSelector, position = 'replace') {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`Failed to load component: ${componentPath}`);
            }
            
            const html = await response.text();
            const target = document.querySelector(targetSelector);
            
            if (!target) {
                throw new Error(`Target element not found: ${targetSelector}`);
            }

            switch (position) {
                case 'replace':
                    target.innerHTML = html;
                    break;
                case 'beforebegin':
                    target.insertAdjacentHTML('beforebegin', html);
                    break;
                case 'afterbegin':
                    target.insertAdjacentHTML('afterbegin', html);
                    break;
                case 'beforeend':
                    target.insertAdjacentHTML('beforeend', html);
                    break;
                case 'afterend':
                    target.insertAdjacentHTML('afterend', html);
                    break;
                default:
                    target.innerHTML = html;
            }

            console.log(`Component loaded: ${componentPath}`);
        } catch (error) {
            console.error(`Error loading component ${componentPath}:`, error);
        }
    }

    /**
     * Load multiple components
     * @param {Array} components - Array of component configurations
     * @returns {Promise<void[]>}
     */
    async loadComponents(components) {
        const promises = components.map(config => 
            this.loadComponent(config.path, config.target, config.position)
        );
        return Promise.all(promises);
    }

    /**
     * Initialize common components for all pages
     */
    async initializeCommonComponents() {
        const components = [
            {
                path: 'components/top-bar.html',
                target: '#top-bar-container',
                position: 'replace'
            },
            {
                path: 'components/navbar.html',
                target: '#navbar-container',
                position: 'replace'
            },
            {
                path: 'components/footer.html',
                target: '#footer-container',
                position: 'replace'
            }
        ];

        await this.loadComponents(components);
        
        // Initialize form submission after footer is loaded
        if (typeof initializeFormSubmission === 'function') {
            initializeFormSubmission();
        }
        
        // Update language for dynamically loaded content
        if (window.languageManager) {
            const containers = [
                document.querySelector('#top-bar-container'),
                document.querySelector('#navbar-container'),
                document.querySelector('#footer-container')
            ].filter(container => container !== null);
            
            containers.forEach(container => {
                window.languageManager.updateDynamicContent(container);
            });
            
            // Also update the language selector to ensure it shows the correct current language
            window.languageManager.updateLanguageSelector();
        }
        
        // Initialize cache management after components are loaded
        if (typeof initializeCacheManagement === 'function') {
            initializeCacheManagement();
        }
    }
}

// Create global instance
window.componentLoader = new ComponentLoader();