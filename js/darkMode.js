function showStars() {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.style.display = 'inline-flex';
    });
}

function hideStars() {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.style.display = 'none';
    });
}

function initializeDarkMode() {
    const html = document.documentElement;
    
    // Check initial theme
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
        showStars();
    } else {
        html.classList.remove('dark');
        hideStars();
    }

    function toggleDarkMode() {
        console.log('Toggle dark mode clicked');
        html.classList.toggle('dark');
        if (html.classList.contains('dark')) {
            console.log('Switching to dark mode');
            localStorage.theme = 'dark';
            showStars();
        } else {
            console.log('Switching to light mode');
            localStorage.theme = 'light';
            hideStars();
        }
    }

    // Add event listeners after DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        const themeToggle = document.getElementById('theme-toggle');
        const themeToggleMobile = document.getElementById('theme-toggle-mobile');
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        // Theme toggle handlers
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleDarkMode);
        }
        
        if (themeToggleMobile) {
            themeToggleMobile.addEventListener('click', toggleDarkMode);
        }

        // Mobile menu handler
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    });
}

// Initialize immediately
initializeDarkMode(); 