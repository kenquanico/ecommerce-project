registerForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const age = Number(document.getElementById("age").value);
  const termsBox = document.getElementById("terms");
  const preferences = document.getElementById("preferences-select").value;



if (!termsBox.checked) {
alert("You must agree to the Terms and Conditions before continuing.");
return;
}

if (Number.isNaN(age) || age < 18) {
alert("You must be 18 or older to register.");
return;
}

if (!email.includes('@')) {
alert("Invalid email format.");
return;
}

  alert("Welcome, " + fullname + "! Your email (" + email + ") has been registered.");
  alert("You will be " + (age + 1) + " next year.");
  alert("Welcome, " + preferences + "!");

var confirmed = confirm("Do you really want to submit your registration?");
if (confirmed) {
alert("Registration successful!");
registerForm.reset();
} else {
alert("Submission cancelled.");
}
});
