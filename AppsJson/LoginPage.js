document.addEventListener("DOMContentLoaded", function () {
    console.log("Page loaded, adding event listeners...");

    function showModal(message) {
        const modal = document.getElementById("custom-modal");
        const modalMessage = document.getElementById("modal-message");

        modalMessage.textContent = message;
        modal.style.display = "flex";
    }

    document.getElementById("close-modal").addEventListener("click", function () {
        document.getElementById("custom-modal").style.display = "none";
    });

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
    document.getElementById("login-form").addEventListener("submit", async function (e) {
        e.preventDefault();
    
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
    
        if (!email || !password) {
            showModal("Please fill in all required fields.");
            return;
        }
    
        try {
            const response = await fetch("https://tawlity.runasp.net/api/Regester/login", {
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
            if (!data || !data.token) {
                throw new Error("Login successful but no token received.");
            }
    
            console.log("Login successful, received token:", data.token);
    
            localStorage.setItem("authToken", data.token);
    
            const decodedToken = parseJwt(data.token);
            console.log("Decoded Token:", decodedToken);
    
            if (decodedToken) {
                // Extract User ID from Token
                const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
                localStorage.setItem("userId", userId); // Store in localStorage for later use
    
                console.log("Stored User ID:", userId);
    
                const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                showModal("Login successful! Redirecting...");
    
                setTimeout(() => {
                    // Redirect with User ID in URL
                    if (role === "Admin" ||role === "RestaurantOwner") {
                        window.location.href = `Admin_Dashbord.html?userId=${userId}`;
                    } 
                    else {
                        window.location.href = `index.html?userId=${userId}`;
                    }
                }, 2000);
            } else {
                showModal("Error retrieving user data. Please try again.");
            }
    
        } catch (error) {
            console.error("Login failed:", error);
            showModal("Invalid email or password. Please try again.");
        }
    });

    document.getElementById("togglePassword").addEventListener("click", function () {
        let passwordField = document.getElementById("password");

        if (passwordField.type === "password") {
            passwordField.type = "text";
            this.innerHTML = '<i class="fa fa-eye-slash"></i>';
        } else {
            passwordField.type = "password";
            this.innerHTML = '<i class="fa fa-eye"></i>';
        }
    });
});
