// WhatsApp Integration for Appointment Booking
document.addEventListener('DOMContentLoaded', function() {
    // Handle booking form submission with WhatsApp integration
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
            const applianceTypeText = document.getElementById('applianceType').options[document.getElementById('applianceType').selectedIndex].text;
            const issueDescription = document.getElementById('issueDescription').value;
            const appointmentDate = document.getElementById('appointmentDate').value;
            const preferredTime = document.getElementById('preferredTime').value;
            const preferredTimeText = document.getElementById('preferredTime').options[document.getElementById('preferredTime').selectedIndex].text;
            const name = document.getElementById('bookingName').value;
            const email = document.getElementById('bookingEmail').value;
            const phone = document.getElementById('bookingPhone').value;
            
            // Format the message for WhatsApp
            const message = `
🔔 *New Appointment Request*
---------------------------
*Customer:* ${name}
*Phone:* ${phone}
*Email:* ${email}
*Appliance:* ${applianceTypeText}
*Issue:* ${issueDescription}
*Date:* ${appointmentDate}
*Time:* ${preferredTimeText}
---------------------------
`;
            
            // Encode the message for URL
            const encodedMessage = encodeURIComponent(message);
            
            // Your WhatsApp number
            const whatsappNumber = "917004771388"; // Format: country code + number without +
            
            // Create WhatsApp API URL
            const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
            
            // Open WhatsApp in a new tab
            window.open(whatsappURL, '_blank');
            
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
        });
    }
    
    // Handle contact form submission with WhatsApp integration
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
            
            // Format the message for WhatsApp
            const whatsappMessage = `
📩 *New Contact Message*
---------------------------
*From:* ${name}
*Phone:* ${phone}
*Email:* ${email}
*Message:* ${message}
---------------------------
`;
            
            // Encode the message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Your WhatsApp number
            const whatsappNumber = "917004771388"; // Format: country code + number without +
            
            // Create WhatsApp API URL
            const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
            
            // Open WhatsApp in a new tab
            window.open(whatsappURL, '_blank');
            
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
        });
    }

    // Make mobile book now button work
    const mobileBookBtn = document.getElementById('mobileBookBtn');
    if (mobileBookBtn) {
        mobileBookBtn.addEventListener('click', function() {
            const bookingModal = document.getElementById('bookingModal');
            if (bookingModal) {
                bookingModal.classList.add('active');
                document.querySelector('.mobile-nav').classList.remove('active');
            }
        });
    }
});
