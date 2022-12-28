import {get as getFromLocalStorage, set as setFromLocalStorage } from "../utils/local-storage.js";
import {userInfoKey, usersKey} from "../constants/local-storage-keys.js"
console.log("hello");

//check user is log in or not
const user = getFromLocalStorage(userInfoKey);
if(!user){
    // window.location.href ="/";
}

const emailInput = document.getElementById("email_input");
const passwordInput = document.getElementById("password_input");
const loginButton = document.getElementById("login_button");

const emailInvalidFeedback = document.querySelector(".email-invalid-feedback");
const passwordInvalidFeedback = document.querySelector(".password-invalid-feedback");

//singUp  function work when click sing up button click

const login = () =>{
    const email = emailInput.value;
    const password = passwordInput.value;

    //if shoes any error feedback that are removed 1st
    emailInput.classList.remove("is-invalid");
    passwordInput.classList.remove("is-invalid");

    let isValid=true;

    if(email===""){
        emailInput.classList.add("is-invalid");
        emailInvalidFeedback.innerText = "Username is required";
        isValid = false;
    }

    if(password===""){
        passwordInput.classList.add("is-invalid");
        passwordInvalidFeedback.innerText = "Password is required";
        isValid = false;
        return;
    }
    
    if (!isValid) {
        return;
    }
    
    //get the all user from the local storage
    let users = getFromLocalStorage(usersKey) || [];
    console.log("users --", users);

    //check the email address alrady present or not
    const user = users.find((etchUser) => etchUser.email === email && etchUser.password === password);
    
    if(!user){
        emailInput.classList.add("is-invalid");
        emailInvalidFeedback.innerText = "Username or password is invalid";
    
        passwordInput.classList.add("is-invalid");
        passwordInvalidFeedback.innerText = "Username or password is invalid";
    
        return;
    }

    setFromLocalStorage(userInfoKey, user);
    window.location.href = "/home";
}

loginButton.addEventListener("click", login);

// http://127.0.0.1:5500/singUp/index.html
// http://127.0.0.1:5500/sign-up/