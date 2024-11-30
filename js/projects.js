const projects = [
    {
        title: 'Landing Page',
        description: 'Customize Modern Design Landing Page',
        image: '../img/landing-page.png',
        tech: ['HTML', 'Tailwind CSS', 'JavaScript'],
        github: 'https://github.com/BahasKoding/LP-Hotels',
        live: 'https://bahaskoding.github.io/LP-Hotels/'
    },
    // ... other projects
];

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2';
    card.setAttribute('data-aos', 'fade-up');
    
    card.innerHTML = `
        <div class="relative group h-48 overflow-hidden">
            <img src="${project.image}" 
                 alt="${project.title}"
                 class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110">
            <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a href="${project.github}" target="_blank" rel="noopener noreferrer" 
                   class="p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" viewBox="0 0 24 24">
                        <!-- GitHub icon path -->
                    </svg>
                </a>
                <a href="${project.live}" target="_blank" rel="noopener noreferrer" 
                   class="p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" viewBox="0 0 24 24">
                        <!-- External link icon path -->
                    </svg>
                </a>
            </div>
        </div>
        <div class="p-6">
            <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">${project.title}</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">${project.description}</p>
            <div class="flex flex-wrap gap-2">
                ${project.tech.map(tech => `
                    <span class="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-sm">
                        ${tech}
                    </span>
                `).join('')}
            </div>
        </div>
    `;
    
    return card;
}

function initializeProjects() {
    const projectsContainer = document.querySelector('#projects .grid');
    projects.forEach(project => {
        projectsContainer.appendChild(createProjectCard(project));
    });
}

// Initialize projects when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeProjects); 