  // Load Profile Data from Local Storage
  document.addEventListener('DOMContentLoaded', function () {
    const name = localStorage.getItem('profileName') || 'John Doe'; // Default value if not found
    const email = localStorage.getItem('profileEmail') || 'john.doe@example.com'; // Default value if not found
    const address = localStorage.getItem('profileAddress') || '123 Main Street, Cityville'; // Default value if not found

    // Update Profile Info
    document.querySelector('.profile-info h4').textContent = name;
    document.querySelector('.profile-info p:nth-of-type(1)').textContent = `Email: ${email}`;
    document.querySelector('.profile-info p:nth-of-type(2)').textContent = `Address: ${address}`;
});



//////////////////////////////////////////////////////////////////////////////////////


  // Logout Button Functionality
  document.getElementById('logout-btn').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default link behavior

    // Show the custom modal
    document.getElementById('custom-modal').style.display = 'flex';
});

// Close Modal
document.getElementById('close-modal').addEventListener('click', function () {
    document.getElementById('custom-modal').style.display = 'none';
});

// Confirm Logout
document.getElementById('confirm-logout').addEventListener('click', function () {
    // Redirect to home page
    window.location.href = "index.html";
});