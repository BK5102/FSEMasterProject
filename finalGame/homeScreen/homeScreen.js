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

  // Create an object with form data
  const formData = {
    firstname: firstName,
    lastname: lastName,
    email: email,
    password: password
  };

  var users = [];
  var regusers = localStorage.getItem("registeredUsers");
  if(regusers != undefined){
    var storedUsers = JSON.parse(regusers);
    storedUsers.push(formData);
    localStorage.setItem("registeredUsers", JSON.stringify(storedUsers));
  }
  else{
    users.push(formData);
    localStorage.setItem("registeredUsers", JSON.stringify(users));
  }  
  // If validation passes, navigate to another page
  window.location.href = "options.html";
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

  if(authenticateUser(email, password)){
    // authentcation succes
    loggedInUserName = getNameByEmailID(email);
    localStorage.setItem("loggedInUser", loggedInUserName);    
    window.location.href = "options.html";
  }
  else{
    alert("Invalid Credentials");
    return; // Stop navigation
  }
    
}




