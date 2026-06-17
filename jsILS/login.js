$(document).ready(function () {

  $("#loginForm").submit(function (e) {
    e.preventDefault();

    let email = $("#loginEmail").val().trim();
    let password = $("#loginPassword").val().trim();

    if (!email || !password) {
      alert("Enter email and password.");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "home.html";
    } else {
      alert("Invalid email or password.");
    }
  });

});
