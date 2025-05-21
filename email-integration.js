// EmailJS Integration for Appointment Booking
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key
    (function() {
        emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual EmailJS public key
    })();
    
    // Handle booking form submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Get form data
            const applianceType = document.getElementById('applianceType').value;
            const issueDescription = document.getElementById('issueDescription').value;
            const appointmentDate = document.getElementById('appointmentDate').value;
            const preferredTime = document.getElementById('preferredTime').value;
            const name = document.getElementById('bookingName').value;
            const email = document.getElementById('bookingEmail').value;
            const phone = document.getElementById('bookingPhone').value;
            
            // Prepare template parameters
            const templateParams = {
                appliance_type: applianceType,
                issue: issueDescription,
                date: appointmentDate,
                time: preferredTime,
                name: name,
                email: email,
                phone: phone
            };
            
            // Send email using EmailJS
            emailjs.send('service_id', 'template_id', templateParams) // Replace with your service and template IDs
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Show success message
                    document.getElementById('bookingSuccess').classList.add('active');
                    bookingForm.reset();
                    
                    // Reset button
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    
                    // Close modal after delay
                    setTimeout(function() {
                        document.getElementById('bookingSuccess').classList.remove('active');
                        document.getElementById('bookingModal').classList.remove('active');
                    }, 3000);
                }, function(error) {
                    console.log('FAILED...', error);
                    
                    // Show error message
                    alert('There was an error sending your booking. Please try again or contact us directly.');
                    
                    // Reset button
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
    
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Prepare template parameters
            const templateParams = {
                name: name,
                email: email,
                phone: phone,
                message: message
            };
            
            // Send email using EmailJS
            emailjs.send('service_id', 'contact_template_id', templateParams) // Replace with your service and template IDs
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Show success message
                    document.getElementById('formSuccess').classList.add('active');
                    contactForm.reset();
                    
                    // Reset button
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    
                    // Hide success message after delay
                    setTimeout(function() {
                        document.getElementById('formSuccess').classList.remove('active');
                    }, 3000);
                }, function(error) {
                    console.log('FAILED...', error);
                    
                    // Show error message
                    alert('There was an error sending your message. Please try again or contact us directly.');
                    
                    // Reset button
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
});
