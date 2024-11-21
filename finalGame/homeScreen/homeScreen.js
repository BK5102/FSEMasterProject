//create account

// Function to gather input data and store it as JSON
function submitUserData() {
  // Access form data
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const password =  document.getElementById('password').value;

  if (!firstName || !lastName || !email || !password) {
      alert("Please fill out all fields.");
      return; // Stop navigation
  }

  // If validation passes, navigate to another page
  window.location.href = "options.html";

  // Create an object with form data
  const formData = {
    name: firstName,
    age: lastName,
    email: email,
    password: password
  };

  // Convert the object to a JSON string
  const jsonData = JSON.stringify(formData);

  // Log or use the JSON data as needed
  console.log(jsonData);

  localStorage.setItem("dataForm", jsonData);
}

// sign in
function submitLoginData() {
  // Access form data
  const email = document.getElementById('email').value;
  const password =  document.getElementById('password').value;

  if (!email || !password) {
      alert("Please fill out all fields.");
      return; // Stop navigation
  }

  // If validation passes, navigate to another page
  window.location.href = "options.html";

  // Create an object with form data
  const formDataLogin = {
    email: email,
    password: password
  };

  // Convert the object to a JSON string
  const jsonData = JSON.stringify(formDataLogin);

  // Log or use the JSON data as needed
  console.log(jsonData);

  localStorage.setItem("formDataLogin", jsonData);
}




