document.addEventListener('DOMContentLoaded', () => {
    // Get all sections with IDs to build navigation dynamically
    const sections = Array.from(document.querySelectorAll('section[id]')).map(section => ({
        id: section.id,
        text: section.id.charAt(0).toUpperCase() + section.id.slice(1)
    }));

    // Function to create navigation links with consistent styling
    function createNavLink(href, text, isMobile = false) {
        const a = document.createElement('a');
        a.href = `#${href}`;
        a.textContent = text;
        a.className = `text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300${isMobile ? ' block py-2' : ''
            }`;
        return a;
    }

    // Clear and populate desktop navigation
    const desktopNav = document.getElementById('desktop-nav');
    if (desktopNav) {
        const themeToggle = desktopNav.querySelector('#theme-toggle');
        desktopNav.innerHTML = '';

        sections.forEach(({ id, text }) => {
            desktopNav.appendChild(createNavLink(id, text));
        });

        if (themeToggle) {
            desktopNav.appendChild(themeToggle);
        }
    }

    // Clear and populate mobile navigation
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        const mobileNavContainer = mobileMenu.querySelector('div') || document.createElement('div');
        mobileNavContainer.className = 'flex flex-col space-y-4';
        mobileNavContainer.innerHTML = '';

        sections.forEach(({ id, text }) => {
            mobileNavContainer.appendChild(createNavLink(id, text, true));
        });

        if (!mobileMenu.contains(mobileNavContainer)) {
            mobileMenu.appendChild(mobileNavContainer);
        }
    }

    // Mobile menu toggle functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    if (mobileMenuButton && mobileMenu) {
        // Toggle mobile menu visibility
        mobileMenuButton.addEventListener('click', () => {
            console.log('Mobile menu button clicked');
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });

        // Close mobile menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Enhanced scroll behavior
    const header = document.querySelector('header');
    let lastScroll = 0;
    const scrollThreshold = 5;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('-translate-y-full', 'shadow-lg');
            return;
        }

        header.classList.add('shadow-lg');

        if (Math.abs(currentScroll - lastScroll) < scrollThreshold) {
            return;
        }

        if (!header.classList.contains('transition-transform')) {
            header.classList.add('transition-transform');
        }

        if (currentScroll > lastScroll && !header.classList.contains('-translate-y-full')) {
            header.classList.add('-translate-y-full');
        } else if (currentScroll < lastScroll && header.classList.contains('-translate-y-full')) {
            header.classList.remove('-translate-y-full');
        }

        lastScroll = currentScroll;
    });

    // Improved active section detection using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -80% 0px', // Adjusts the detection area
        threshold: 0
    };

    function updateActiveLink(currentId) {
        const allLinks = document.querySelectorAll('nav a');
        allLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
                link.classList.add('text-blue-600', 'dark:text-blue-400', 'font-medium');
                link.classList.remove('text-gray-600', 'dark:text-gray-300');
            } else {
                link.classList.remove('text-blue-600', 'dark:text-blue-400', 'font-medium');
                link.classList.add('text-gray-600', 'dark:text-gray-300');
            }
        });
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateActiveLink(entry.target.id);
                // Update URL hash without scrolling
                history.replaceState(null, null, `#${entry.target.id}`);
            }
        });
    }, observerOptions);

    sections.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section) observer.observe(section);
    });

    // Set initial active state based on URL hash or first section
    function setInitialActiveSection() {
        const hash = window.location.hash.slice(1) || sections[0]?.id;
        if (hash) {
            updateActiveLink(hash);
        }
    }

    setInitialActiveSection();

    // Smooth scroll behavior for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                updateActiveLink(targetId);
            }
        });
    });
}); 