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
  if(sessionStorage.getItem("userId") !== "disconnected" || sessionStorage.getItem("userId") === null)
  {
    sessionStorage.setItem("userId", "disconnected")
    window.location.href = "../Pages/Dashboard.html";
  }
};


function register()
{
  var identity = document.getElementById("identity");
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  var code = document.getElementById("code");

  let codes_ = []

  if(identity.value && email.value && password.value && code.value)
  {  
    const codeRef = ref(db, "ADMIN/codes");
    onValue(codeRef, (snapshot) => {
      const codes = snapshot.val();
      codes_ = codes;
    });


    for(let i in codes_)
    {
      if (codes_[i]["code"] === code.value)
      {
        if(codes_[i]["used"] === false)
        {  
          push(ref(db, "USERS/"), {
            identity: identity.value,
            email: email.value.toUpperCase(),
            password: password.value,
            type: "user",
            workdays: ""
          })
          .then(()=>{
      
            status.textContent = "Vous avez bien ete enregistre dans notre systeme";
            set(ref(db, `ADMIN/codes/${i}/used`), true);
            identity.value = "";
            email.value = "";
            password.value = "";
            code.value = "";              
          })
          .catch((error) => {
            status.textContent = "Une erreur est apparut durant l'inscription :" + error;
          }); 
        }
        else
        {
          status.textContent = "Ce code est deja utilise";
        }


      }
      else {
        status.textContent = "Le code est faux";
      }

    }  
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