//////////////reference/////////////////
var redirect = document.getElementById("redirect");


window.onload = () => {
    if(localStorage.getItem("userId") === null || localStorage.getItem("userId") === "disconnected")
    {     
        redirect.insertAdjacentHTML("beforeend", `<a href="./Pages/Login.html">Se connecter</a>`);
        redirect.insertAdjacentHTML("beforeend", `<a href="./Pages/createAccount.html">S'inscrire</a>`);  
    }
    else
    {
        redirect.insertAdjacentHTML("beforeend", `<a href="./Pages/Dashboard.html">Dashboard</a>`);
    }
};