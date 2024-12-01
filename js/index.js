let userName = document.getElementById("nameBtn");
let email = document.getElementById("emailBtn");
let password = document.getElementById("passwordBtn");
let signupBtn = document.getElementById("signup-btn");
let validation = document.querySelectorAll(".validaion");

let users = [];
if (localStorage.getItem("users") !== null) {
  users = JSON.parse(localStorage.getItem("users"));
}

signupBtn.addEventListener("click", function () {
  if (
    validationAllInputs(userName) &&
    validationAllInputs(email) &&
    validationAllInputs(password)
  ) {
    let user = {
      userName: userName.value,
      email: email.value,
      password: password.value,
    };
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === user.email) {
        getMessageValidation("Email already exists", "text-danger");
        return;
      }
    }
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    getMessageValidation("Success", "text-success");

    setTimeout(function () {
      window.location = "./login.html";
    } ,1000);
  } else {
    getMessageValidation("All inputs are required", "text-danger");
  }
});

function validationAllInputs(element) {
  let regex = {
    nameBtn: /^[A-Za-z0-9]{2,10}$/,
    emailBtn: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    passwordBtn: /^[A-Za-z0-9]{2,10}$/,
  };
  let term = element.value;
  if (regex[element.id].test(term)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}

function getMessageValidation(message, color) {
  const msgElement = document.getElementById("msgValidation");
  msgElement.innerHTML = message;
  msgElement.classList.remove("text-success", "text-danger"); 
  msgElement.classList.add(color); 
  msgElement.classList.remove("d-none");
}
