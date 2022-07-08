//////////////reference/////////////////
var redirect = document.getElementById("redirect");


window.onload = () => {
    if(sessionStorage.getItem("userId") === null || sessionStorage.getItem("userId") === "disconnected")
    {     
        redirect.insertAdjacentHTML("beforeend", `<a href="./Pages/Login.html" class="btn">Se connecter</a>`);
        redirect.insertAdjacentHTML("beforeend", `<a href="./Pages/createAccount.html" class="btn">S'inscrire</a>`);  
    }
    else
    {
        redirect.insertAdjacentHTML("beforeend", `<a href="./Pages/Dashboard.html">Dashboard</a>`);
    }
};