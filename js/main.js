// Dark mode toggle
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved theme preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }

    // Theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.theme = isDark ? 'dark' : 'light';
    });

    // Initialize stars
    initializeStars();
    initializeContactStars();
});

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

function initializeContactStars() {
    const contactStarsContainer = document.getElementById('contact-stars');
    for (let i = 0; i < 25; i++) {
        createStar(contactStarsContainer);
    }
}