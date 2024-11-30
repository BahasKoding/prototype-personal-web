function initializeContactForm() {
    const form = document.querySelector('#contact-form');
    const inputs = form.querySelectorAll('input, textarea');

    // Add animation classes to form elements
    inputs.forEach((input, index) => {
        input.parentElement.setAttribute('data-aos', 'fade-left');
        input.parentElement.setAttribute('data-aos-delay', (index * 100).toString());
    });

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Clear form
            form.reset();
            alert('Message sent successfully!');
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// Update contact section HTML to match React version
function updateContactSection() {
    const contactInfo = document.querySelector('#contact .grid div:first-child');
    contactInfo.innerHTML = `
        <div class="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg transition-colors duration-300" data-aos="fade-right">
            <div class="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <svg class="text-blue-600 dark:text-blue-400 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
            </div>
            <div>
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Email</h3>
                <p class="text-gray-600 dark:text-gray-300">business.rkhmt@gmail.com</p>
            </div>
        </div>
        <!-- Phone info -->
        <div class="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg transition-colors duration-300" data-aos="fade-right" data-aos-delay="100">
            <div class="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <svg class="text-green-600 dark:text-green-400 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
            </div>
            <div>
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Phone</h3>
                <p class="text-gray-600 dark:text-gray-300">+62 812-9041-3175</p>
            </div>
        </div>
        <!-- Location info -->
        <div class="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg transition-colors duration-300" data-aos="fade-right" data-aos-delay="200">
            <div class="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <svg class="text-purple-600 dark:text-purple-400 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
            </div>
            <div>
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Location</h3>
                <p class="text-gray-600 dark:text-gray-300">Jakarta, Indonesia</p>
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    initializeContactForm();
    updateContactSection();
}); 