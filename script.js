// ====================== Sidebar Circular Menu ======================
let menuIndex = 0;
const menuItems = document.querySelectorAll(".menu-item");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

// Function to position items in a circular arc
function updateMenu(index) {
  const radius = 100; // radius of circular arc
  const centerX = 110; // sidebar center X (half of sidebar width 220px)
  const centerY = window.innerHeight / 2 + 20; // vertical center below logo

  menuItems.forEach((item, i) => {
    const angleStep = Math.PI / (menuItems.length - 1); // divide semi-circle
    const angle = angleStep * (i - index); // offset from active item
    const x = centerX + radius * Math.sin(angle) - item.offsetWidth / 2;
    const y = centerY - radius * Math.cos(angle) - item.offsetHeight / 2;

    item.style.left = `${x}px`;
    item.style.top = `${y}px`;

    // Update classes
    item.classList.remove("active", "prev", "next");
    if (i === index) item.classList.add("active");
    else if (i === (index - 1 + menuItems.length) % menuItems.length) item.classList.add("prev");
    else if (i === (index + 1) % menuItems.length) item.classList.add("next");
  });
}

// Navigation buttons
if(nextBtn && prevBtn) {
  nextBtn.addEventListener("click", () => {
    menuIndex = (menuIndex + 1) % menuItems.length;
    updateMenu(menuIndex);
  });
  prevBtn.addEventListener("click", () => {
    menuIndex = (menuIndex - 1 + menuItems.length) % menuItems.length;
    updateMenu(menuIndex);
  });
}

// Auto slide
setInterval(() => {
  menuIndex = (menuIndex + 1) % menuItems.length;
  updateMenu(menuIndex);
}, 5000);

// Mobile toggle
const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');

sidebarToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

// Initialize menu positions
updateMenu(menuIndex);

// ======================= Hero Section Slider =======================
const slides = document.querySelectorAll(".hero-slide");
const heroNext = document.getElementById("hero-next");
const heroPrev = document.getElementById("hero-prev");
let heroIndex = 0;

function showSlide(i) {
  slides.forEach((s, idx) => s.classList.toggle("active", idx === i));
}

function nextSlide() {
  heroIndex = (heroIndex + 1) % slides.length;
  showSlide(heroIndex);
}

function prevSlide() {
  heroIndex = (heroIndex - 1 + slides.length) % slides.length;
  showSlide(heroIndex);
}

if (heroNext && heroPrev && slides.length > 0) {
  heroNext.addEventListener("click", nextSlide);
  heroPrev.addEventListener("click", prevSlide);
  setInterval(nextSlide, 5000);
}

// ====================== Experience Toggle ======================
const expCheck = document.getElementById("exp_check");
const expFields = document.getElementById("exp_fields");

if (expCheck && expFields) {
  expCheck.addEventListener("change", () => {
    expFields.classList.toggle("hidden", !expCheck.checked);
  });
}

// ====================== Franchise Form Submission ======================
const formEl = document.getElementById("applyForm");
const thankYouEl = document.getElementById("thankyou-message");
const msgEl = document.getElementById("form-msg");

if (formEl) {
  formEl.addEventListener("submit", async (e) => {
    e.preventDefault();

    msgEl.textContent = "Submitting your application...";
    msgEl.style.color = "#555";

    const formData = new FormData(formEl);
    const applicantName = formData.get("first_name")?.trim() || "Applicant";

    try {
      const res = await fetch(formEl.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        msgEl.textContent = "✅ Application submitted successfully!";
        msgEl.style.color = "#28a745";

        // Store applicant name for personalized thank-you
        localStorage.setItem("applicantName", applicantName);

        // Smooth fade + redirect
        formEl.classList.add("fade-out");

        setTimeout(() => {
          formEl.style.display = "none";
          thankYouEl.classList.remove("hidden");
          thankYouEl.classList.add("fade-in");

          // ✅ Redirect to payment page after short delay
          setTimeout(() => {
            console.log("Redirecting to payment page...");
            window.location.href = "./payments/payment-confirmation.html";
          }, 2500);
        }, 600);

      } else {
        msgEl.textContent = "⚠️ Submission failed. Please try again later.";
        msgEl.style.color = "#e74c3c";
      }
    } catch (error) {
      console.error(error);
      msgEl.textContent = "❌ Network error. Please check your connection.";
      msgEl.style.color = "#e74c3c";
    }
  });
}
