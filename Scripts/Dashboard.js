import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import {getDatabase,ref,onValue, push } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";
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

const reference = ref(db, "USERS/" + id);
onValue(reference, (snapshot) => {
    const data = snapshot.val();
    document.getElementById("name").textContent = data["identity"]
});



logout.addEventListener("click", () => {localStorage.setItem("userId", "disconnected"); window.location.reload();});


var calendar = document.getElementById("calendar");
var currDate = document.getElementById("currDate");
var testBtn = document.getElementById("testBTN")


function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function addWorkDay()
{
  push(ref(db, "ADMIN/codes/"), {
    code : "CCpd94",
    used : false
  });
}

testBtn.addEventListener("click", addWorkDay);
document.getElementById("load").addEventListener("click", loadWork);
document.getElementById("draw").addEventListener("click", drawCalendar);

const days = [ "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const months = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"]

const date = new Date();
const workingDays = [];


currDate.textContent = days[date.getDay()] + " " + date.getDate() + " " + months[date.getMonth()] + " " +date.getFullYear();
var daysInCurrentMonth = getDaysInMonth(date.getFullYear(), date.getMonth()+1); 

var numberOfDays = 0;


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
  for(let day = date.getDay() != 0 ? date.getDate() - date.getDay() : date.getDay() ; numberOfDays < 7; day++)
  {
    
    if(day > daysInCurrentMonth)
    {
      day = 1;
      daysInCurrentMonth = getDaysInMonth(date.getFullYear(), date.getMonth()+1);
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


  