document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("edit-profile-form");

    // Function to get query parameters
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Extract userId from URL (Make it accessible globally inside this event listener)
    const userId = getQueryParam("userId");

    if (!userId) {
        alert("User ID missing in URL!");
        window.location.href = "index.html"; // Redirect if no user ID
        return;
    }

    // Load current user details
    async function loadUserProfile() {
        try {
            const response = await fetch(`https://localhost:7039/api/UserProfile/${userId}`);
            if (!response.ok) throw new Error("User not found");

            const user = await response.json();

            // Fill the form with user data
            document.getElementById("name").value = user.employeeName;
            document.getElementById("phone").value = user.employeePhone;
            document.getElementById("city").value = user.employeeCity; // Pre-select the correct city

        } catch (error) {
            console.error("Error loading user data:", error);
            alert("Error loading user data.");
        }
    }

    // Submit form & update profile
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const updatedUser = {
            EmployeeName: document.getElementById("name").value,
            EmployeePhone: document.getElementById("phone").value,
            EmployeeCity: parseInt(document.getElementById("city").value), // Convert to int
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
            window.location.href = `Profile.html?userId=${userId}`; // Redirect back

        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Error updating profile. Try again.");
        }
    });

    // Call function to load user data when the page loads
    loadUserProfile();
});
