import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import {getDatabase,ref,push, onValue,set } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";
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
var registerBTN = document.getElementById("registerBTN");
var status = document.getElementById("statusText");

window.onload = () => {
  if(localStorage.getItem("userId") !== "disconnected" || localStorage.getItem("userId") === null)
  {
    localStorage.setItem("userId", "disconnected")
    window.location.href = "../Pages/Dashboard.html";
  }
};

function register()
{
  var identity = document.getElementById("identity");
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  var code = document.getElementById("code");


  if(identity.value && email.value && password.value && code.value)
  {  
    const codeRef = ref(db, "ADMIN/codes");
    onValue(codeRef, (snapshot2) => {
      const codes = snapshot2.val();
      for(let i in codes)
      {
        if (codes[i]["code"] == code.value)
        {
          console.log(code.value + "/" + codes[i]["code"])
          if(codes[i]["used"] === false)
          {
            console.log(i);
            set(ref(db, `ADMIN/codes/${i}/used/`), true);
  
            push(ref(db, "USERS/"), {
              identity: identity.value,
              email: email.value.toUpperCase(),
              password: password.value,
              type: "user",
              workdays: ""
            })
            .then(()=>{
        
              status.textContent = "Vous avez bien ete enregistre dans notre systeme";
  
              identity.value = "";
              email.value = "";
              password.value = "";
              code.value = "";
            })
            .catch((error) => {
              status.textContent = "Une erreur est apparut durant l'inscription :" + error;
            }); 
          }

        }
        else {
          status.textContent = "Le code est faux ou deja utilise";
        }
      }
    });
    
  
  }
  else{
    status.textContent = "S'il vous plait, remplissez toute les cases";
  }

  // const reference = ref(db, "ADMIN");
  // onValue(reference, (snapshot) => {
  //   const data = snapshot.val();
  //   for(let i in data)
  //   {
  //     status.textContent += data[i];
  //   }
  // });

}


registerBTN.addEventListener("click", register);