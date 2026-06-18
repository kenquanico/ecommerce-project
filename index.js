document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");
  const showLogin = document.getElementById("showLogin");
  const showRegister = document.getElementById("showRegister");

  if (showLogin && loginForm && registerForm) {
    showLogin.addEventListener("click", function (event) {
      event.preventDefault();
      registerForm.classList.add("hidden");
      loginForm.classList.remove("hidden");
    });
  }

  if (showRegister && loginForm && registerForm) {
    showRegister.addEventListener("click", function (event) {
      event.preventDefault();
      loginForm.classList.add("hidden");
      registerForm.classList.remove("hidden");
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const fullname = document.getElementById("fullname").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const age = Number(document.getElementById("age").value);
      const termsBox = document.getElementById("terms");
      const preferences = document.getElementById("preferences-select").value;

      if (!fullname || !email || !password || !preferences) {
        alert("Please complete all fields.");
        return;
      }

      if (!termsBox.checked) {
        alert("You must agree to the Terms and Conditions before continuing.");
        return;
      }

      if (!Number.isFinite(age) || age < 18) {
        alert("You must be 18 or older to register.");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Invalid email format.");
        return;
      }

      if (confirm("Do you really want to submit your registration?")) {
        alert("Welcome, " + fullname + "! Your email (" + email + ") has been registered.");
        alert("You will be " + (age + 1) + " next year.");
        alert("Welcome, " + preferences + "!");
        registerForm.reset();
      } else {
        alert("Submission cancelled.");
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      alert("Login submitted successfully.");
    });
  }
});
