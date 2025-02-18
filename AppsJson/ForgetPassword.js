document.addEventListener("DOMContentLoaded", function () {
    console.log("Forgot Password Page Loaded");

    function showAlert(message) {
        const alertBox = document.getElementById("custom-alert");
        document.getElementById("alert-message").textContent = message;
        alertBox.style.display = "flex";
    }

    document.getElementById("close-alert").addEventListener("click", function () {
        document.getElementById("custom-alert").style.display = "none";
    });

    document.getElementById("forgot-password-form").addEventListener("submit", async function (e) {
        e.preventDefault(); // Prevent default form submission

        const email = document.getElementById("email").value.trim();
        if (!email) {
            showAlert("Please enter a valid email address.");
            return;
        }

        try {
            const response = await fetch("https://localhost:7039/api/Regester/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ email: email })
            });

            const result = await response.json();
            
            if (response.ok) {
                showAlert("A password reset link has been sent to your email.");
                setTimeout(() => {
                    window.location.href = "ResetPassPage.html";
                }, 3000);
            } else {
                showAlert(result.message || "Something went wrong. Try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            showAlert("Failed to send reset email. Please check your connection.");
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