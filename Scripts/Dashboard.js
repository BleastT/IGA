import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import {getDatabase,ref,onValue, set, push } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";
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

var logout = document.getElementById("logoutBTN");

window.onload = () => {
    if(localStorage.getItem("userId") === "disconnected" || localStorage.getItem("userId") === null)
    {
      localStorage.setItem("userId", "disconnected")
      window.location.href = "../Pages/Login.html";
    }
};

var id = localStorage.getItem("userId");
var body = document.getElementById("body")

if(id !== "admin$%_)")
{
  body.insertAdjacentHTML("beforeend", `
    <a href="../index.html"><img src="../images/logo.ico" alt=""></a>
    <button id="logoutBTN">Se deconnecter</button>
    <h1 id="name"></h1>
    <button id="testBTN">add Workday</button>
    <button id="draw">Draw calendar</button>
    <h3 id="currDate"></h3>
    <div id="calendar"></div>`);

  var draw = document.getElementById("draw");
  var logout = document.getElementById("logoutBTN");
  var calendar = document.getElementById("calendar");
  var currDate = document.getElementById("currDate");
  var testBtn = document.getElementById("testBTN")

  const reference = ref(db, "USERS/" + id);
  onValue(reference, (snapshot) => {
      const data = snapshot.val();
      document.getElementById("name").textContent = data["identity"]
  });


  console.log(new Date(2022, 7, 7).toDateString());

  const days = [ "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const months = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"]

  const date = new Date();
  const workingDays = [];

  currDate.textContent = days[date.getDay()] + " " + date.getDate() + " " + months[date.getMonth()] + " " +date.getFullYear();
  var daysInCurrentMonth = getDaysInMonth(date.getFullYear(), date.getMonth()+1); 

  var numberOfDays = 0;

  function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  function addWorkDay()
  {
    set(ref(db, `USERS/${id}/workdays/${new Date(2022, 7, 7).toDateString()}`), {
      time : "14h a 20h"
    });
  }


  function loadWork()
  {
    const daysRef = ref(db, "USERS/" + id + "/workdays/");
    onValue(daysRef, (snapshot) => {
      const data = snapshot.val();
      for(let i in data)
      {
        workingDays.push([new Date(i), data[i]["time"]]);
      }
    });
  }



  function isWorkingDay(day)
  {
    let is_WorkingDay = "";
    for(let i = 0; i < workingDays.length ; i++)
    {
      console.log(workingDays[i][0].getDate());
      if(workingDays[i][0].getDate() === day)
      {
        is_WorkingDay = workingDays[i][1];
        break;
      }
    }

    return is_WorkingDay;
  }

  function drawCalendar()
  {

    loadWork();

    for(let day = date.getDay() != 0 ? date.getDate() - date.getDay() : date.getDay() ; numberOfDays < 7; day++)
    {
      
      if(day > daysInCurrentMonth)
      {
        day = 1;
        daysInCurrentMonth = getDaysInMonth(date.getFullYear(), date.getMonth()+1);
      }
      else if(day < 1)
      {
        day = getDaysInMonth(date.getFullYear(), date.getMonth()-1);
      }

      let is_WorkingDay;
      is_WorkingDay = isWorkingDay(day);

      if(is_WorkingDay !== "")
      {
        calendar.insertAdjacentHTML("beforeend",`<div class="day" id="workingDay">${day}<div>${is_WorkingDay}</div></div`);
      }
      else{
        if(day == date.getDate())
        {
          calendar.insertAdjacentHTML("beforeend",`<div class="day" id="today">${day}</div`);
        }
        else{
          calendar.insertAdjacentHTML("beforeend",`<div class="day">${day}</div`);
        }
      }

      numberOfDays++; 


    }

  }


  draw.addEventListener("click", drawCalendar);
  logout.addEventListener("click", () => {localStorage.setItem("userId", "disconnected"); window.location.reload();});
  testBtn.addEventListener("click", addWorkDay);

}
else
{

  body.insertAdjacentHTML("beforeend", `<button id="logout">Se deconnecter</button>
  <div id='usersList'></div>
  <button id="codeGenerate">Generer un code d'inscription</button>
  <h5 id="newCode"></h5>
  <input type="text" id="userToMod" placeholder="Numero de L'employer">
  <input type="text" id="workDate" placeholder="Date de travail(m/d/y)">
  <input type="text" id="workHours_start" placeholder="Debut de l'Heur">
  <input type="text" id="workHours_end" placeholder="fin de l'Heur">
  <button id="update">Enregistrer</button>
  `);


  var userNbr = document.getElementById("userToMod");
  var workDate = document.getElementById("workDate");
  var workStart = document.getElementById("workHours_start");
  var workEnd = document.getElementById("workHours_end");
  var update = document.getElementById("update");
  var newCode = document.getElementById("newCode");
  var logout = document.getElementById("logout");
  var codeGenerate = document.getElementById("codeGenerate");
  var usersList = document.getElementById("usersList");
  let users = [];


  const reference = ref(db, "USERS/");
  onValue(reference, (snapshot) => {
    const data = snapshot.val();
    if(data !== null || users === [])
    {
      users = [];
      usersList.innerHTML = '';
      for(let i in data)
      {
        users.push([data[i]["identity"], i]);
      }
    }
    else
    {
      users.push("vous n'avez pas d'employers");
    }

    for(let i in users)
    {
      usersList.insertAdjacentHTML("beforeend", `<div id='user'>${i}:${users[i][0]}</div>`)
    }
  });



  function generateCode()
  {
    var length = 5;
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    push(ref(db, "ADMIN/codes"), {
      code: result,
      used: false,
    });

    newCode.textContent = `Ce code : ${result} a ete genere`;
  
  }

  function save()
  {
    var month = parseInt(workDate.value.split("/")[0] - 1).toString();
    var day = workDate.value.split("/")[1];
    var year = workDate.value.split("/")[2]
    set(ref(db,`USERS/${users[userNbr.value][1]}/workdays/${new Date(year, month, day).toDateString()}/`), {
      time : workStart.value + "h a " + workEnd.value + "h"
    });

    userNbr.value = '';
    workDate.value = '';
    workStart.value = '';
    workEnd.value = '';
  }

  update.addEventListener("click", save);
  codeGenerate.addEventListener("click", generateCode);
  logout.addEventListener("click", () => {localStorage.setItem("userId", "disconnected"); window.location.reload();});
}



  