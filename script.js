const calendar = document.getElementById("calendar-month");
const calendarMonth = document.getElementsByClassName("month")[0];


  
  

const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

nextBtn.addEventListener("click", printNextMonth);
prevBtn.addEventListener("click", printPrevMonth);

let monthCount = 0;
let yearCount = 0;

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
  for (let i = 0; i < numberDays; i++) {
    const day = document.createElement("div");
    day.classList.add("day");
    day.addEventListener("click", addEventCalendar);
    const dayNumber = document.createElement("p");
    dayNumber.textContent = i + 1;
    calendar.appendChild(day);
    day.appendChild(dayNumber);
  }
}
function addEventCalendar(){
    console.log("hola");
 };

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
