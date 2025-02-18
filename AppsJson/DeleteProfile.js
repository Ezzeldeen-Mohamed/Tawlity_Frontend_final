  // Handle Delete Account Button Click
  document.getElementById('delete-account-btn').addEventListener('click', function () {
    const confirmationModal = document.getElementById('confirmation-modal');
    confirmationModal.style.display = 'flex';
});

// Handle Confirm Delete Button Click
document.getElementById('confirm-delete').addEventListener('click', function () {
    const confirmationModal = document.getElementById('confirmation-modal');
    const successModal = document.getElementById('success-modal');
    const successMessage = document.getElementById('success-message');

    confirmationModal.style.display = 'none'; // Hide confirmation modal
    successMessage.textContent = 'Account deleted successfully!';
    successModal.style.display = 'flex'; // Show success modal

    // Here you can add code to send a request to the server to delete the account
    setTimeout(() => {
        window.location.href = 'index.html'; // Redirect to home page after 2 seconds
    }, 3000);
});

// Handle Cancel Delete Button Click
document.getElementById('cancel-delete').addEventListener('click', function () {
    const confirmationModal = document.getElementById('confirmation-modal');
    confirmationModal.style.display = 'none'; // Hide confirmation modal
});

// Close Success Modal
document.getElementById('close-success-modal').addEventListener('click', function () {
    const successModal = document.getElementById('success-modal');
    successModal.style.display = 'none';
});