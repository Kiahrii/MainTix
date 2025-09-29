// Elements
const getStartedBtn = document.getElementById('getStartedBtn');
const landingPage = document.getElementById('landingPage');
const formContainer = document.getElementById('formContainer');
const loginForm = document.getElementById('loginForm');

// Show form on Get Started click
getStartedBtn.addEventListener('click', () => {
  landingPage.classList.add('hide');
  setTimeout(() => {
    formContainer.classList.add('show');
  }, 500);
});

// Show specific form (login, register, forgot password)
function showForm(formId) {
  document.querySelectorAll(".form-box").forEach(form => form.classList.remove("active"));
  document.getElementById(formId).classList.add("active");
}

// Background click to return to landing page
document.querySelector('.background').addEventListener('click', function (e) {
  const isInsideForm = e.target.closest('.form-box');
  if (!isInsideForm && formContainer.classList.contains('show')) {
    formContainer.classList.remove('show');
    landingPage.classList.remove('hide');
  }
});

// LOGIN FORM SUBMIT HANDLER
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const emailInput = document.getElementById("email").value.trim().toLowerCase();

  // Admin check (exact match)
  if (emailInput === "admin@upang") {
    window.location.href = "admin.html";
    return;
  }

  // PHINMA email regex:
  // pattern: letters (a-z) + dot separated parts, ending with '.up@phinmaed.com'
  // Example valid: jata.agas.up@phinmaed.com
  const phinmaEmailRegex = /^[a-z]+(\.[a-z]+)*\.up@phinmaed\.com$/;

  if (phinmaEmailRegex.test(emailInput)) {
    const usernamePart = emailInput.split("@")[0]; // e.g., jata.agas.up
    window.location.href = `dashboard.html?username=${encodeURIComponent(usernamePart)}`;
  } else {
    alert("Invalid email format! Use your PHINMA account email (e.g., jata.agas.up@phinmaed.com) or 'admin@upang' for admin.");
  }
});
