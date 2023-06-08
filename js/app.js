const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const texting = document.querySelector("#texting");


const HIDDEN_CLASSNAME = "hidden";
const USERNAME = "username";

function onLoginSubmit(event) {
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;
    paintGreetings(username);
    greeting.classList.remove(HIDDEN_CLASSNAME);
    localStorage.setItem(USERNAME,username);

    console.log("test11"); 
}

function paintGreetings(username_){

    greeting.innerText = "안녕하세요! " + username_ + "님";
    greeting.classList.remove(HIDDEN_CLASSNAME);

}


const savedUsername = localStorage.getItem(USERNAME);

if(savedUsername === null)
{
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);

} else
{
    paintGreetings(savedUsername);
}
