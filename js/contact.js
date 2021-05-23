const fullName = document.querySelector("#contact__form-fullname");
const phoneNumber = document.querySelector("#contact__form-phonenumber");
const email = document.querySelector("#contact__form-email");
const textArea = document.querySelector("#contact__form-textarea");
const form = document.querySelector("#contact-form");
const button = document.querySelector(".contact__form-button");
const message = document.querySelector(".contact__form-message");

const fullNameError = document.querySelector(".fullname-error");
const phoneNumberError = document.querySelector(".phonenumber-error");
const emailError = document.querySelector(".email-error");


fullName.addEventListener("keyup", () => {
    checkButton();
    checkName();
});

phoneNumber.addEventListener("keyup", () => {
    checkButton();
    checkNumber();
});

email.addEventListener("keyup", () => {
    checkButton();
    checkEmail();
});


function checkName() {
    if(checkForm(fullName.value, 2)) {
        fullNameError.style.display = "none";
    }
    else {
        fullNameError.style.display = "block";
    }
}

function checkNumber() {
    if(checkForm(phoneNumber.value, 8) && !isNaN(phoneNumber.value)) {
        phoneNumberError.style.display = "none";
    }
    else {
        phoneNumberError.style.display = "block";
    }
}

function checkEmail() {
    if(validateEmail(email.value)) {
        emailError.style.display = "none";
    }
    else {
        emailError.style.display = "block";
    }
}

function checkButton() {
    if(checkForm(fullName.value, 2) && checkForm(phoneNumber.value, 8) && validateEmail(email.value)) {
        button.disabled = false;
    }
    else {
        message.innerHTML = "";
        button.disabled = true;
    }
}


form.addEventListener("submit", validateForm);

function validateForm(event) {
    event.preventDefault();
    message.style.display = "grid";
    message.innerHTML = "Message sendt!"
    
    form.reset();
    button.disabled = "true";
}

function checkForm(value, length) {
    if(value.trim().length >= length) {
        return true;
    }
    else {
        return false;
    }
}

function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}