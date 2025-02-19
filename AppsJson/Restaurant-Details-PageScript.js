
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

document.addEventListener("DOMContentLoaded", async function () {
    const params = new URLSearchParams(window.location.search);
    const restaurantId = params.get("restaurantId") || params.get("id"); // Support both

    if (!restaurantId) {
        document.getElementById("restaurantName").innerText = "Restaurant Not Found";
        document.getElementById("loading-spinner").style.display = "none";
        return;
    }

    try {
        // Fetch restaurant details
        const response = await fetch(`https://localhost:7039/api/Restaurant/with-menu/${restaurantId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Populate restaurant details
        document.getElementById("restaurantName").innerText = data.name;
        document.getElementById("restaurantLocation").innerText = data.address || "Unknown Location";
        document.getElementById("restaurantImage").src = data.imageUrl || "/assets/images/restaurant-2.jpeg";
        document.getElementById("restaurantImage").alt = data.name;

        // Hide loading spinner
        document.getElementById("loading-spinner").style.display = "none";

        // Update "Reserve Now" link
        document.getElementById("reserveNowBtn").href = `reservation.html?restaurantId=${restaurantId}`;

        // Update "View More Menu" link
        document.getElementById("viewMoreMenu").href = `restaurant-menu.html?restaurantId=${restaurantId}`;

        // Update menu list (show first 3 items only)
        const menuList = document.getElementById("menuItems");
        menuList.innerHTML = ""; // Clear previous content

        if (!data.menuItems || data.menuItems.length === 0) {
            menuList.innerHTML = "<p>No menu items found.</p>";
        } else {
            data.menuItems.slice(0, 3).forEach(item => { // Show only first 3 items
                const menuItem = document.createElement("li");
                menuItem.classList.add("list-group-item");
                menuItem.innerHTML = `<strong>${item.name}:</strong> $${item.price} <br> ${item.description || ""}`;
                menuList.appendChild(menuItem);
            });
        }

    } catch (error) {
        console.error("Error fetching restaurant details:", error);
        document.getElementById("restaurantName").innerText = "Failed to load restaurant details.";
        document.getElementById("loading-spinner").style.display = "none";
    }
});
