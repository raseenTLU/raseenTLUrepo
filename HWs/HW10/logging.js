import {signup, login} from './auth.js';

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signupBtn = document.getElementById("signup");
const loginBtn = document.getElementById("login");
const messageDiv = document.getElementById("message");

const showMessage = (msg, isError=false) => {
    messageDiv.textContent = msg;
    messageDiv.style.color = isError? 'red' : 'green';
}

// SIGN UP BUTTON EVENT LISTENER
signupBtn.addEventListener("click", async (e)=>{
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    try{
        const user = await signup(email, password);
        showMessage("signup successful. Welcome " + user.email);
        setTimeout(()=> {
            window.location.href = "app.html";
        }, 1000)
    }
    catch (error){
        showMessage(error.message, true);
    }
    
})

// SIGN IN BUTTON EVENT LISTENER
loginBtn.addEventListener("click", async (e)=>{
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    try{
        const user = await login(email, password);
        showMessage("login successful. Welcome " + user.email);
        setTimeout(()=> {
            window.location.href = "app.html";
        }, 1000)
    }
    catch (error){
        showMessage(error.message, true);
    }
    
})