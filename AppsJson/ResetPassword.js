document.addEventListener("DOMContentLoaded", function () {
    console.log("Reset Password Page Loaded");

    function showAlert(message) {
        const alertBox = document.getElementById("custom-alert");
        document.getElementById("alert-message").textContent = message;
        alertBox.style.display = "flex";
    }

    document.getElementById("close-alert").addEventListener("click", function () {
        document.getElementById("custom-alert").style.display = "none";
    });

    document.getElementById("reset-password-form").addEventListener("submit", async function (e) {
        e.preventDefault(); // Prevent form submission

        const token = document.getElementById("token").value.trim();
        const newPassword = document.getElementById("new-password").value.trim();
        const confirmPassword = document.getElementById("confirm-password").value.trim();

        if (!token || !newPassword || !confirmPassword) {
            showAlert("Please fill in all fields.");
            return;
        }

        if (newPassword !== confirmPassword) {
            showAlert("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch(`https://localhost:7039/api/Regester/reset-password/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ 
                    newPassword: newPassword, 
                    confirmPassword: confirmPassword
                })
            });

            const result = await response.json();

            if (response.ok) {
                showAlert("Password reset successful! Redirecting to login...");
                setTimeout(() => {
                    window.location.href = "LoginPage.html";
                }, 3000);
            } else {
                showAlert(result.message || "Something went wrong.");
            }
        } catch (error) {
            console.error("Reset password failed:", error);
            showAlert("Failed to reset password. Try again.");
        }
    });
});
document.querySelectorAll(".toggle-password").forEach(button => {
    button.addEventListener("click", function () {
        let targetId = this.getAttribute("data-target");
        let passwordField = document.getElementById(targetId);
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
});
