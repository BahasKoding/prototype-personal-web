function initializeStars() {
    const backgroundStars = document.getElementById('background-stars');
    const imageStars = document.getElementById('image-stars');

    // Create background stars
    for (let i = 0; i < 50; i++) {
        createStar(backgroundStars);
    }

    // Create image stars
    for (let i = 0; i < 30; i++) {
        createStar(imageStars, {
            top: `${15 + Math.random() * 70}%`,
            left: `${5 + Math.random() * 40}%`
        });
    }
}

function createStar(container, options = {}) {
    const star = document.createElement('div');
    star.className = 'absolute inline-flex';
    
    const top = options.top || `${Math.random() * 100}%`;
    const left = options.left || `${Math.random() * 100}%`;
    const blur = options.blur || Math.random() * 3 + 1;
    
    star.style.cssText = `
        top: ${top};
        left: ${left};
        filter: blur(${blur}px);
        mix-blend-mode: lighten;
        opacity: 0;
        transform: scale(0.5);
    `;
    
    star.innerHTML = `
        <svg class="w-1 h-1" viewBox="0 0 24 24" fill="none">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" 
                  fill="currentColor" 
                  class="text-white opacity-70"/>
        </svg>
    `;
    
    container.appendChild(star);
    
    // Animate using GSAP
    gsap.to(star, {
        opacity: 0.8,
        scale: 1,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: Math.random() * 3
    });
}

// Update existing animations.js with additional animations
function addScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                if (entry.target.dataset.aosDelay) {
                    entry.target.style.transitionDelay = `${entry.target.dataset.aosDelay}ms`;
                }
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Add smooth scroll behavior
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    addScrollAnimations();
    initializeSmoothScroll();
});