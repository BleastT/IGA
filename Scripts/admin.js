import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import {getDatabase,ref, onValue } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyAofKs4FUvog9oY8CnWnOr-w54fbGARAio",
  authDomain: "igeacalendrier.firebaseapp.com",
  projectId: "igeacalendrier",
  storageBucket: "igeacalendrier.appspot.com",
  messagingSenderId: "945941529057",
  appId: "1:945941529057:web:18df1d2156b900d2b612a0",
  measurementId: "G-TX0YHRW2L2",
};
const app = initializeApp(firebaseConfig);
const db = getDatabase();


//////////////////////////////////Reference/////////////////////////////////
var connectBTN = document.getElementById("connectBTN");
var status = document.getElementById("statusText");



window.onload = () => {
    if(localStorage.getItem("userId") !== "disconnected" && localStorage.getItem("userId") !== null)
    {
      window.location.href = "../Pages/Dashboard.html";
    }
  };

async function connect()
{
  var id;

  var email =  document.getElementById("email");
  var password = document.getElementById("password");

  var logged = false;

  if(email.value && password.value)
  {
    const reference = ref(db, "ADMIN/");
    onValue(reference, (snapshot) => {
      const data = snapshot.val();;
      if (data != null)
      {
        // console.log(data["email"]);
        // console.log(data["password"]);
        if(email.value.toUpperCase() == data["email"] && password.value == data["password"])
        {
            localStorage.setItem("userId", "admin$%_)");
            status.textContent = "Bienvenue Administrateur";
            window.location.reload();
            logged = true;
        }
        else{
            status.textContent = "Verifiez que vous avez entrez les bons renseignements";
        }
        
      }
      else{
        status.textContent = "Aucun compte n'a ete creer poour le moment";
      }
    });


    password.value = "";
  }
  else{
    status.textContent = "S'il vous plait, remplissez toute les cases";
  }

}

connectBTN.addEventListener("click", connect);