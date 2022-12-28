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
const confirmPasswordInput = document.getElementById("confirm_password_input");
const signupButton = document.getElementById("signup_button");

const emailInvalidFeedback = document.querySelector(".email-invalid-feedback");
const passwordInvalidFeedback = document.querySelector(".password-invalid-feedback");
const confirmPasswordInvalidFeedback = document.querySelector(".confirm-password-invalid-feedback");


//singUp  function work when click sing up button click

const singUp = () =>{
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    //if shoes any error feedback that are removed 1st
    emailInput.classList.remove("is-invalid");
    passwordInput.classList.remove("is-invalid");
    confirmPasswordInput.classList.remove("is-invalid");

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

    const emailTestRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!emailTestRegex.test(email)){
        emailInput.classList.add("is-invalid");
        emailInvalidFeedback.innerText = "enter a valid email address";
        isValid = false;
        return;
    }

    const passwordTestRegex =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if(!passwordTestRegex.test(password)){
           passwordInput.classList.add("is-invalid");
             passwordInvalidFeedback.innerText = "password should contain atleast one number and one special character, it length should be 6-16";
isValid = false;
        return;
    }

    if (password !== confirmPassword) {
        passwordInput.classList.add("is-invalid");
        confirmPasswordInput.classList.add("is-invalid");
    
        invalidFeedbackForPassword.innerText = "Password does not match";
        invalidFeedbackForConfirmPassword.innerText = "Password does not match";
    
        isValid = false;
      }
    
    if (!isValid) {
        return;
    }
    
    //get the all user from the local storage
    let users = getFromLocalStorage(usersKey) || [];
    console.log("users --", users);

    //check the email address alrady present or not
    const checkUserPresent = users.some((etchUser) => etchUser.email === email);
    if(checkUserPresent){
        emailInput.classList.add("is-invalid");
        emailInvalidFeedback.innerText = "User is already present";
        return;
    }

    //set all the value in newUserinfo object
    const newUserinfo = {
        email:email,
        password: password,
    }

    //add the new user information in the localStorage
    setFromLocalStorage(usersKey, [...users, newUserinfo]);

    window.location.href ="/";

}

signupButton.addEventListener("click", singUp);