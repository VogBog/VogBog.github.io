const signup_window = document.getElementById("signup-window");
const login_window = document.getElementById("login-window");

function signup() {
    login_window.style.visibility = "hidden";
    signup_window.style.visibility = "visible";
}

function login() {
    login_window.style.visibility = "visible";
    signup_window.style.visibility = "hidden";
}

login();

function onSignup() {
    let password1 = document.getElementById("password1").value;
    let password2 = document.getElementById("password2").value;
    if(password1 == password2 && password1.trim() != "") {
        document.location.href = "index.html";
    }
    else {
        alert("Вы неправильно повторили пароль!");
    }
}

function onLogin() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    if(email == "admin@gmail.com" && password == "admin") {
        document.location.href = "index.html";
    }
    else {
        alert("Такого пользователя нет!");
    }
}