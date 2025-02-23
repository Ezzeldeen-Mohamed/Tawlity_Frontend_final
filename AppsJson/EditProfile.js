document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("edit-profile-form");

    // Load current user details
    async function loadUserProfile() {
        const userId = localStorage.getItem("userId"); // Retrieve user ID from storage
        if (!userId) {
            alert("User not logged in!");
            window.location.href = "index.html"; // Redirect to home
            return;
        }

        try {
            const response = await fetch(`https://localhost:7039/api/UserProfile/${userId}`);
            if (!response.ok) throw new Error("User not found");

            const user = await response.json();

            // Fill the form with user data
            document.getElementById("name").value = user.fullName;
            document.getElementById("email").value = user.email;
            document.getElementById("address").value = user.address;

        } catch (error) {
            console.error("Error loading user data:", error);
        }
    }

    // Submit form & update profile
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const updatedUser = {
            fullName: document.getElementById("name").value,
            email: document.getElementById("email").value,
            address: document.getElementById("address").value,
        };

        try {
            const response = await fetch(`https://localhost:7039/api/User/UpdateUser/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedUser),
            });

            if (!response.ok) throw new Error("Failed to update profile");

            alert("Profile updated successfully!");
            window.location.href = "Profile.html"; // Redirect back

        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Error updating profile. Try again.");
        }
    });

    loadUserProfile(); // Load user data when the page loads
});