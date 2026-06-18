(function () {
  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem("users") || "[]");
    } catch (error) {
      return [];
    }
  }

  function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");

    if (registerForm) {
      registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const fullname = document.getElementById("fullname").value.trim();
        const age = Number(document.getElementById("age").value);
        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value.trim();
        const preference = document.getElementById("preference").value;
        const terms = document.getElementById("terms").checked;

        if (!fullname || !age || !email || !password || !preference) {
          alert("Please complete all fields.");
          return;
        }

        if (!terms) {
          alert("You must agree to the terms.");
          return;
        }

        if (!Number.isFinite(age) || age < 18) {
          alert("You must be 18 or older.");
          return;
        }

        if (!isValidEmail(email)) {
          alert("Please enter a valid email address.");
          return;
        }

        const users = getUsers();
        if (users.some(function (user) { return user.email === email; })) {
          alert("Email already registered.");
          return;
        }

        if (!confirm("Do you want to submit your registration?")) {
          alert("Registration cancelled.");
          return;
        }

        users.push({ fullname, age, email, password, preference, tasks: [] });
        saveUsers(users);
        alert("Registration successful! You will be redirected to login.");
        window.location.href = "login.html";
      });
    }

    if (loginForm) {
      loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value.trim();

        if (!email || !password) {
          alert("Please enter your email and password.");
          return;
        }

        const users = getUsers();
        const currentUser = users.find(function (user) {
          return user.email === email && user.password === password;
        });

        if (!currentUser) {
          alert("Invalid email or password.");
          return;
        }

        currentUser.tasks = Array.isArray(currentUser.tasks) ? currentUser.tasks : [];
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        alert("Logged in as " + currentUser.fullname + ".");
        window.location.href = "index.html";
      });
    }
  });
}());
