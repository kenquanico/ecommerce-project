$(document).ready(function() {


  $("#loginLink").click(function(e) {
    e.preventDefault();
    $("#registerBox, #registerFooter").hide();
    $("#loginBox, #loginFooter").show();
  });

  $("#registerLink").click(function(e) {
    e.preventDefault();
    $("#loginBox, #loginFooter").hide();
    $("#registerBox, #registerFooter").show();
  });

  $("#registerForm").submit(function(e) {
    e.preventDefault();

    const fullname = $("#fullname").val().trim();
    const age = parseInt($("#age").val().trim());
    const email = $("#email").val().trim();
    const password = $("#password").val().trim();
    const preference = $("#preference").val();
    const terms = $("#terms").is(":checked");

    if (!fullname || !age || !email || !password || !preference) {
      alert("All fields are required.");
      return;
    }

    if (!terms) {
      alert("You must agree to the terms.");
      return;
    }

    if (age < 18) {
      alert("You must be 18 or older.");
      return;
    }

    if (!email.includes("@")) {
      alert("Invalid email format.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");


    if (users.some(u => u.email === email)) {
      alert("Email already registered.");
      return;
    }

    const user = { fullname, age, email, password, preference };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    if (confirm("Do you want to submit your registration?")) {
      alert("Registration successful. Welcome " + fullname + "!");
      $("#registerForm")[0].reset();
    } else {
      alert("Registration cancelled.");
    }
  });

 
  $("#loginForm").submit(function(e) {
    e.preventDefault();

    const email = $("#loginEmail").val().trim();
    const password = $("#loginPassword").val().trim();
    if (!email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const currentUser = users.find(u => u.email === email && u.password === password);

    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      alert("Logged in as " + currentUser.fullname);
      window.location.href = "index.html";
    } else {
      alert("Invalid email or password.");
    }
  });

});
