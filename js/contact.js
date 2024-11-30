document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwjvisp9DKsT_9caMEAB80d1QbHnCrMyKq5UgdTQ8-wNXAne_EVeWLlyRpy6Cw_ZdCWhA/exec';

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form values
        const nama = document.querySelector('input[name="nama"]').value.trim();
        const email = document.querySelector('input[name="email"]').value.trim();
        const pesan = document.querySelector('textarea[name="pesan"]').value.trim();

        // Validation checks
        let isValid = true;

        // Basic validation
        if (nama.length < 3) {
            isValid = false;
            await Swal.fire({
                icon: 'error',
                title: 'Invalid Name',
                text: 'Name must be at least 3 characters long',
                confirmButtonColor: '#3B82F6'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            isValid = false;
            await Swal.fire({
                icon: 'error',
                title: 'Invalid Email',
                text: 'Please enter a valid email address',
                confirmButtonColor: '#3B82F6'
            });
        }

        // Message validation
        if (pesan.length < 10) {
            isValid = false;
            await Swal.fire({
                icon: 'error',
                title: 'Message Too Short',
                text: 'Message must be at least 10 characters long',
                confirmButtonColor: '#3B82F6'
            });
        }

        // If any validation fails, stop here
        if (!isValid) {
            return;
        }

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
        `;

        try {
            // Send to Google Sheets only if validation passes
            const response = await fetch(scriptURL, {
                method: 'POST',
                body: new FormData(contactForm)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Show success message
            await Swal.fire({
                icon: 'success',
                title: 'Message Sent!',
                text: 'Thank you for contacting us. We will get back to you soon!',
                confirmButtonColor: '#3B82F6',
                timer: 3000,
                timerProgressBar: true
            });

            // Reset form
            contactForm.reset();

        } catch (error) {
            console.error('Error!', error.message);
            // Show error message
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong! Please try again later.',
                confirmButtonColor: '#3B82F6'
            });
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    });

    // Real-time validation feedback
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.validity.valid) {
                input.classList.remove('border-red-500');
                input.classList.add('border-green-500');
            } else {
                input.classList.remove('border-green-500');
                input.classList.add('border-red-500');
            }
        });
    });
}); 