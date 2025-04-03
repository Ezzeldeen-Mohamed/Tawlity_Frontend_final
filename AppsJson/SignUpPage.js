document.addEventListener("DOMContentLoaded", async function () {
    const API_BASE_URL = "https://tawlityweb.runasp.net/api/Regester";

    
    // Populate dropdowns with enum values
    function populateDropdowns() {
        const genderDropdown = document.getElementById("gender");
        const cityDropdown = document.getElementById("city");

        const genderEnum = [
            { id: 0, name: "Male" },
            { id: 1, name: "Female" }
        ];

        const cityEnum = [
            { id: 0, name: "Cairo" },
            { id: 1, name: "Alexandria" },
            { id: 2, name: "Giza" },
            { id: 3, name: "Sharm El Sheikh" },
            { id: 4, name: "Hurghada" },
            { id: 5, name: "Luxor" },
            { id: 6, name: "Aswan" },
            { id: 7, name: "Mansoura" },
            { id: 8, name: "Tanta" },
            { id: 9, name: "Suez" },
            { id: 10, name: "Port Said" },
            { id: 11, name: "Ismailia" },
            { id: 12, name: "Damanhur" },
            { id: 13, name: "Zagazig" },
            { id: 14, name: "Minya" },
            { id: 15, name: "Assiut" },
            { id: 16, name: "Beni Suef" },
            { id: 17, name: "Sohag" },
            { id: 18, name: "Qena" },
            { id: 19, name: "Kafr El Sheikh" },
            { id: 20, name: "Faiyum" },
            { id: 21, name: "Matrouh" },
            { id: 22, name: "Damietta" },
            { id: 23, name: "North Sinai" },
            { id: 24, name: "South Sinai" },
            { id: 25, name: "New Valley" },
            { id: 26, name: "Red Sea" }
        ];

        // Populate gender dropdown
        genderEnum.forEach(g => {
            const option = document.createElement("option");
            option.value = g.id;
            option.textContent = g.name;
            genderDropdown.appendChild(option);
        });

        // Populate city dropdown
        cityEnum.forEach(c => {
            const option = document.createElement("option");
            option.value = c.id;
            option.textContent = c.name;
            cityDropdown.appendChild(option);
        });
    }

    populateDropdowns();

    // Show message in modal
    function showModal(message) {
        const modal = document.getElementById("custom-modal");
        const modalMessage = document.getElementById("modal-message");
        modalMessage.textContent = message;
        modal.style.display = "flex";
    }

    document.getElementById("close-modal").addEventListener("click", function () {
        document.getElementById("custom-modal").style.display = "none";
    });

    // Handle sign-up
    document.getElementById("signup-form").addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const gender = parseInt(document.getElementById("gender").value);
        const city = parseInt(document.getElementById("city").value);
        const phone = document.getElementById("phone").value.trim();
        const creditCard = document.getElementById("creditCard").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirm-password").value.trim();
        const termsAccepted = document.getElementById("terms").checked;

        if (!termsAccepted) {
            showModal("You must accept the terms and conditions.");
            return;
        }

        if (password !== confirmPassword) {
            showModal("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    employeeName: name,
                    employeeEmail: email,
                    employeeGender: gender,
                    employeePhone: phone,
                    employeeCity: city,
                    employeePassword: password,
                    employeeConfirmPassword: confirmPassword,
                    employeeCreditCard: creditCard,
                }),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || "Registration failed.");
            }

            const data = await response.json();
            showModal("Registration successful! Redirecting...");

            setTimeout(() => {
                window.location.href = "LoginPage.html";
            }, 3000);

        } catch (error) {
            console.error("Registration Error:", error);
            showModal(error.message);
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