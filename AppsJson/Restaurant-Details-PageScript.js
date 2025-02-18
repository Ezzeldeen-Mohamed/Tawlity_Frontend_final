
 // do here if login change nav else make nav by defult
 document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
    const navLinks = document.getElementById("nav-links");

    if (token) {
        // ✅ User is logged in: Show Home, Profile, and Logout
        navLinks.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="Profile.html">Profile</a></li>
            <li class="nav-item"><button class="btn btn-danger ml-2" id="logout-btn">Logout</button></li>
        `;

        // Handle Logout with Confirmation Modal
        document.getElementById("logout-btn").addEventListener("click", function () {
            document.getElementById("logout-confirmation-modal").style.display = "flex"; // Show modal
        });

        // Confirm Logout
        document.getElementById("confirm-logout").addEventListener("click", function () {
            localStorage.removeItem("authToken"); // Remove token
            window.location.href = "index.html"; // Redirect to home
        });

        // Cancel Logout
        document.getElementById("cancel-logout").addEventListener("click", function () {
            document.getElementById("logout-confirmation-modal").style.display = "none"; // Hide modal
        });

    } else {
        // ❌ User is not logged in: Show Home, Login, and Sign Up
        navLinks.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="LoginPage.html">Login</a></li>
            <li class="nav-item"><a class="nav-link" href="SignUpPage.html">Sign Up</a></li>
        `;
    }
});
