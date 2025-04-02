document.addEventListener("DOMContentLoaded", async function () {
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");

  if (!token || !userId) {
      window.location.href = "Login.html"; // Redirect to login if not authenticated
      return;
  }

  const apiUrl = `https://tawlityweb.runasp.net/api/User/Profile/${userId}`;
  
  try {
      const response = await fetch(apiUrl, {
          headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
          }
      });

      if (!response.ok) {
          throw new Error(`Failed to fetch profile data (Status: ${response.status})`);
      }

      const data = await response.json();

      // ✅ Update Profile Info
      document.getElementById("profile-name").textContent = data.fullName;
      document.getElementById("profile-email").textContent = `Email: ${data.email}`;
      document.getElementById("profile-address").textContent = `Address: ${data.address}`;

      // ✅ Update Reservation History
      const reservationList = document.getElementById("reservation-list");
      reservationList.innerHTML = ""; // Clear previous entries

      if (data.reservationsForProfile?.length > 0) {
          data.reservationsForProfile.forEach(reservation => {
              const listItem = document.createElement("li");
              listItem.className = "list-group-item";
              listItem.textContent = `${reservation.restaurantName} - ${new Date(reservation.reservationDate).toLocaleDateString("en-GB")}`;
              reservationList.appendChild(listItem);
          });
      } else {
          reservationList.innerHTML = "<li class='list-group-item text-muted'>No reservations found.</li>";
      }

      // ✅ Update the "Edit Profile" button with userId in URL
      document.getElementById("edit-profile-btn").href = `EditProfile.html?userId=${userId}`;

  } catch (error) {
      console.error("Error loading profile:", error);
      document.getElementById("profile-name").textContent = "Error loading profile";
      document.getElementById("reservation-list").innerHTML = "<li class='list-group-item text-danger'>Error fetching reservations.</li>";
  }

  // 🔹 Logout Functionality
  document.getElementById("logout-btn").addEventListener("click", () => {
      document.getElementById("logout-confirmation-modal").style.display = "flex"; // Show modal
  });

  document.getElementById("confirm-logout").addEventListener("click", () => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");

      // Reset Navbar Links
      const navLinks = document.getElementById("nav-links");
      if (navLinks) {
          navLinks.innerHTML = `
              <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
              <li class="nav-item"><a class="nav-link" href="Login.html">Login</a></li>
              <li class="nav-item"><a class="nav-link" href="Register.html">Sign Up</a></li>
          `;
      }

      document.getElementById("logout-confirmation-modal").style.display = "none";
      window.location.href = "index.html"; // Redirect to home page
  });

  document.getElementById("cancel-logout").addEventListener("click", () => {
      document.getElementById("logout-confirmation-modal").style.display = "none";
  });
});
