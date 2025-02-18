 // JavaScript for handling form submission and modal
 document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form from submitting

    // Show success message in modal
    document.getElementById('modal-message').textContent = 'Thank you! Your message has been sent.';
    document.getElementById('custom-modal').style.display = 'flex';

    // Clear form fields
    document.getElementById('contact-form').reset();
});

// Close modal when "OK" button is clicked
document.getElementById('close-modal').addEventListener('click', function () {
    document.getElementById('custom-modal').style.display = 'none';
});