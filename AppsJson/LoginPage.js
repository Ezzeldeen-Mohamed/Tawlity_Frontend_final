document.addEventListener("DOMContentLoaded", function () {
    console.log("Page loaded, adding event listeners...");

    function showModal(message) {
        const modal = document.getElementById("custom-modal");
        const modalMessage = document.getElementById("modal-message");

        modalMessage.textContent = message; // Show message
        modal.style.display = "flex"; // Display modal
    }

    document.getElementById("close-modal").addEventListener("click", function () {
        document.getElementById("custom-modal").style.display = "none";
    });

    // Function to decode JWT token
    function parseJwt(token) {
        try {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split("")
                    .map(function (c) {
                        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                    })
                    .join("")
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    }

    // Handle Login Form Submission
    document.getElementById("login-form").addEventListener("submit", async function (e) {
        e.preventDefault(); // Prevent default form submission

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!email || !password) {
            showModal("Please fill in all required fields.");
            return;
        }

        try {
            const response = await fetch("https://localhost:7039/api/Regester/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ 
                    employeeEmail: email, 
                    employeePassword: password 
                })
            });

            if (!response.ok) {
                throw new Error("Invalid email or password. Please try again.");
            }

            const data = await response.json();
            console.log("Login successful, received token:", data.token);

            // Store Token in LocalStorage
            localStorage.setItem("authToken", data.token);

            // Decode the JWT token to get the user role
            const decodedToken = parseJwt(data.token);
            console.log("Decoded Token:", decodedToken);

            if (decodedToken && decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]) {
                const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

                showModal(`Login successful! Redirecting...`);

                setTimeout(() => {
                    if (role === "Admin") {
                        window.location.href = "Admin_Dashbord.html"; // page for delete restaurant data and edit
                    } 
                    else if(role==="RestaurantOwner"){
                        window.location.href = "Admin_Dashbord.html";  // page to edit restaurant data 
                    }
                    else {
                        window.location.href = "index.html";
                    }
                }, 2000);
            } else {
                showModal("Error retrieving role. Please try again.");
            }

        } catch (error) {
            console.error("Login failed:", error);
            showModal("Invalid email or password. Please try again.");
        }
    });
});
document.getElementById("togglePassword").addEventListener("click", function () {
    let passwordField = document.getElementById("password");
    let icon = this.querySelector("i");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash"); // 🔹 تغيير الأيقونة عند الإظهار
    } else {
        passwordField.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye"); // 🔹 تغيير الأيقونة عند الإخفاء
    }
});
