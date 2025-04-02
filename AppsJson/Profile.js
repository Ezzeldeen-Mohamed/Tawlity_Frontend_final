document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
        window.location.href = "Login.html"; // إعادة التوجيه إذا لم يكن المستخدم مسجلاً للدخول
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

        // ✅ تحديث بيانات الملف الشخصي
        document.getElementById("profile-name").textContent = data.fullName;
        document.getElementById("profile-email").textContent = `Email: ${data.email}`;
        document.getElementById("profile-address").textContent = `Address: ${data.address}`;

        // ✅ تحديث قائمة الحجوزات
        const reservationList = document.getElementById("reservation-list");
        reservationList.innerHTML = "";

        if (data.reservationForProfiles?.length > 0) {
            data.reservationForProfiles.forEach(reservation => {
                const listItem = document.createElement("li");
                listItem.className = "list-group-item";

                const formattedDate = new Date(reservation.reservationDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                });

                listItem.textContent = `${reservation.restaurantName} - ${formattedDate}`;
                reservationList.appendChild(listItem);
            });
        } else {
            reservationList.innerHTML = "<li class='list-group-item text-muted'>No reservations found.</li>";
        }

        // ✅ تحديث رابط تعديل الملف الشخصي
        document.getElementById("edit-profile-btn").href = `EditProfile.html?userId=${userId}`;

    } catch (error) {
        console.error("Error loading profile:", error);
        document.getElementById("profile-name").textContent = "Error loading profile";
        document.getElementById("reservation-list").innerHTML = "<li class='list-group-item text-danger'>Error fetching reservations.</li>";
    }

    // ✅ التحقق من وجود الأزرار قبل إضافة الأحداث لتجنب الأخطاء
    const logoutBtnNavbar = document.getElementById("logout-btn");
    const logoutBtnProfile = document.getElementById("profile-logout-btn");
    const confirmLogoutBtn = document.getElementById("confirm-logout");
    const closeModalBtn = document.getElementById("close-modal");
    const modal = document.getElementById("custom-modal");

    if (logoutBtnNavbar||logoutBtnProfile) {
        logoutBtnNavbar.addEventListener("click", () => {
            modal.style.display = "flex"; // إظهار المودال
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        const logoutBtnProfile = document.getElementById("profile-logout-btn");
        if (logoutBtnProfile) {
            logoutBtnProfile.addEventListener("click", () => {
                document.getElementById("custom-modal").style.display = "flex"; // إظهار المودال
            });
        }
    });
    

    if (confirmLogoutBtn) {
        confirmLogoutBtn.addEventListener("click", () => {
            localStorage.removeItem("authToken");
            localStorage.removeItem("userId");

            // تحديث الروابط في النافبار إذا كان موجودًا
            const navLinks = document.getElementById("nav-links");
            if (navLinks) {
                navLinks.innerHTML = `
                    <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="Login.html">Login</a></li>
                    <li class="nav-item"><a class="nav-link" href="Register.html">Sign Up</a></li>
                `;
            }

            modal.style.display = "none";
            window.location.href = "index.html"; // إعادة التوجيه إلى الصفحة الرئيسية
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            modal.style.display = "none"; // إخفاء المودال عند الإلغاء
        });
    }
});
