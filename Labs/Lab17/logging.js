import {signup, login} from './auth.js';

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signupBtn = document.getElementById("signup");
const signinBtn = document.getElementById("login");
const messageDiv = document.getElementById("message");

const showMessage = (msg, isError=false) => {
    messageDiv.textContent = msg;
    messageDiv.style.color = isError? 'red' : 'green';
}

signupBtn.addEventListener("click", async (e)=>{
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    //console.log("Sign Up Clicked!", email, password);
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
    
    //console.log(user);
})

signinBtn.addEventListener('click', async (e)=>{
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        const user = await login(email, password);
        showMessage("Login successful. Welcome " + user.email);
        setTimeout(()=> {
            window.location.href = "app.html";
        }, 1000)
    }
    catch (error) {
        showMessage(error.message, true);
    }
})