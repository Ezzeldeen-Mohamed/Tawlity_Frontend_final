 // JavaScript to handle the custom modal
 const logoutButton = document.getElementById('logoutButton');
 const customModal = document.getElementById('customModal');
 const confirmLogout = document.getElementById('confirmLogout');
 const cancelLogout = document.getElementById('cancelLogout');

 // Show modal when logout button is clicked
 logoutButton.addEventListener('click', function(event) {
     event.preventDefault(); // Prevent default link behavior
     customModal.style.display = 'flex'; // Show the modal
 });

 // Handle confirm logout
 confirmLogout.addEventListener('click', function() {
     window.location.href = 'index.html'; // Redirect to home page
 });

 // Handle cancel logout
 cancelLogout.addEventListener('click', function() {
     customModal.style.display = 'none'; // Hide the modal
 });

 // Close modal if clicked outside the modal content
 window.addEventListener('click', function(event) {
     if (event.target === customModal) {
         customModal.style.display = 'none';
     }
 });





 
 // do here if login change nav else make nav by defult

 document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("authToken");
    const navLinks = document.getElementById("nav-links");

    if (token) {
        // If user is logged in, show profile & logout button
        navLinks.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="Profile.html">My Profile</a></li>
            <li class="nav-item"><a class="nav-link" href="Community.html">Community</a></li>
            <li class="nav-item"><button class="btn btn-danger ml-2" id="logout-btn">Logout</button></li>
        `;

        // Add logout event listener
        document.getElementById("logout-btn").addEventListener("click", function () {
            document.getElementById("logout-confirmation-modal").style.display = "flex"; // Show confirmation modal
        });

        // Handle confirm logout
        document.getElementById("confirm-logout").addEventListener("click", function () {
            localStorage.removeItem("authToken"); // Remove token
            window.location.href = "index.html"; // Redirect to home page
        });

        // Handle cancel logout
        document.getElementById("cancel-logout").addEventListener("click", function () {
            document.getElementById("logout-confirmation-modal").style.display = "none"; // Hide modal
        });

    } else {
        // If not logged in, show login & sign-up links
        navLinks.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="LoginPage.html">Login</a></li>
            <li class="nav-item"><a class="nav-link" href="SignUpPage.html">Sign Up</a></li>
            <li class="nav-item"><a class="nav-link" href="Community.html">Community</a></li>
        `;
    }
});