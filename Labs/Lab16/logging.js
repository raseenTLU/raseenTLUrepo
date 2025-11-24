import { signup } from "./auth,js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signupBtn = document.getElementById("signup");
const loginBtn = document.getElementById("login");
const messageDiv = document.getElementById("message");

const showMsg = (msg, isError=flase) => {
    messageDiv.textContent = msg;
    messageDiv.style.color = isError? 'red' : 'green'; //if function
}
signupBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    console.log("signup clicked", email, password);
    try{
        const user = await  signup(email, password);
        showMsg("Sign Up Success!", user.email);
        setTimeout(()=>{
            window.location.ref = "app.html";

        },1000)
    }
        catch(error){
            showMsg(error.msg,true);
        }
    }
    
    //console.log(user);
    
})