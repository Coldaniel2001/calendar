const calendar = document.getElementById("calendar-month");
const calendarMonth = document.getElementsByClassName("month")[0];
const addEvent = document.getElementById("addEvent");
const modalBody = document.getElementsByClassName("modal-body")[0];


let monthCount = 0;
let yearCount = 0;
let currentDay;
let currentDayId;
let currentDayColor;

//localstorage

let inputValue = JSON.parse(localStorage.getItem("calendar")) || [];
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

nextBtn.addEventListener("click", printNextMonth);
prevBtn.addEventListener("click", printPrevMonth);
addEvent.addEventListener("click", addEventCalendar)

function setCurrentDay(e) {
  currentDay = e.target;
  currentDayId = e.target.getAttribute("dayId");

  currentDayColor = e.target.children[1];



}




function addEventCalendar(e) {

  const inputEvent = document.createElement("textarea");
  inputEvent.classList.add("inputEvent");
  modalBody.appendChild(inputEvent);
  const buttonConfirm = document.createElement("button");
  buttonConfirm.classList.add("buttonConfirm");
  buttonConfirm.textContent = "Confirm";
  buttonConfirm.addEventListener("click", confirmEvent);
  const buttonCancel = document.createElement("button");
  buttonCancel.classList.add("buttonCancel");
  buttonCancel.textContent = "Cancel";
  buttonCancel.addEventListener("click", cancelEvent);
  addEvent.removeEventListener("click", addEventCalendar);
  modalBody.appendChild(buttonConfirm);
  modalBody.appendChild(buttonCancel);


  function cancelEvent() {
    modalBody.removeChild(buttonConfirm);
    modalBody.removeChild(buttonCancel);
    modalBody.removeChild(inputEvent);
    addEvent.addEventListener("click", addEventCalendar);
  }

  function confirmEvent() {
    if (inputEvent.value == "") {
      alert("You can't insert because you haven't written anything")
    } else {
      let date = new Date();
      let idEvent = date.getTime();
      inputValue.push({
        eventContent: inputEvent.value,
        idEvent: idEvent,
        dayId: currentDayId
      })
      let transformString = JSON.stringify(inputValue);
      localStorage.setItem("calendar", transformString);
      modalBody.removeChild(buttonConfirm);
      modalBody.removeChild(buttonCancel);
      modalBody.removeChild(inputEvent);
      const contentEvent = document.createElement("p");
      contentEvent.classList.add("paragraph-content-now");
      contentEvent.textContent = inputEvent.value;
      currentDay.appendChild(contentEvent);
      addEvent.addEventListener("click", addEventCalendar);
    }


  }

};




document.body.addEventListener("load", printDays(monthCount, yearCount));

function printDays(monthCounter, yearCounter) {
  calendar.innerHTML = "";

  const date = new Date();

  let getMonthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  calendarMonth.textContent =
    getMonthArray[date.getMonth() + monthCounter] + ' ' +
    (parseInt(date.getFullYear()) +
      yearCounter);

  let numberDays = new Date(
    date.getFullYear() + yearCounter,
    date.getMonth() + 1 + monthCounter,
    0
  ).getDate();
  let dayColor = new Date();
  for (let i = 0; i < numberDays; i++) {
    const day = document.createElement("div");
    day.classList.add("day");
    day.setAttribute("data-bs-target", "#miModal");
    day.setAttribute("data-bs-toggle", "modal");
    day.setAttribute("dayId", `${i + 1}-${date.getMonth() + 1 + monthCounter}-${date.getFullYear() + yearCounter}`);
    const dayNumber = document.createElement("p");
    dayNumber.classList.add("day-number");
    dayNumber.textContent = i + 1;
    calendar.appendChild(day);
    day.appendChild(dayNumber);
    day.addEventListener("click", setCurrentDay);

    console.log((`${date.getDate() }-${date.getMonth() + 1}-${date.getFullYear()}`)); 
    console.log(inputValue[0].dayId);

    inputValue.forEach(inputValues => {
      if (inputValues.dayId === day.getAttribute("dayId")) {
        let p = document.createElement("p");
        p.classList.add("paragraph-content-future");
        p.textContent = inputValues.eventContent;
        day.appendChild(p);
        if (inputValues.dayId === (`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`)) {
          dayNumber.style.background = "blue";
          p.classList.replace("paragraph-content-future", "paragraph-content-now");
        }

        
      }


    });
  }
}

function printNextMonth() {
  monthCount++;

  if (monthCount === 12) {
    monthCount = 0;
    yearCount++;
  }

  printDays(monthCount, yearCount);
}

function printPrevMonth() {
  monthCount--;

  if (monthCount === -1) {
    monthCount = 11;
    yearCount--;
  }

  printDays(monthCount, yearCount);
}
