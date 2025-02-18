// Handle Edit Profile Form Submission
document.getElementById('edit-profile-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get Form Data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    // Save Data to Local Storage
    localStorage.setItem('profileName', name);
    localStorage.setItem('profileEmail', email);
    localStorage.setItem('profileAddress', address);

    // Show Custom Modal
    const modal = document.getElementById('custom-modal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = 'Profile updated successfully!';
    modal.style.display = 'flex';

    // Redirect to Profile Page after 2 seconds
    setTimeout(() => {
        window.location.href = 'profile.html';
    }, 2000);
});

// Close Modal
document.getElementById('close-modal').addEventListener('click', function () {
    const modal = document.getElementById('custom-modal');
    modal.style.display = 'none';
});