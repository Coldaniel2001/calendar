const calendar = document.getElementById("calendar-month");
const calendarMonth = document.getElementsByClassName("month")[0];
function printDays() {
    const date = new Date();
    console.log(date);
    let getMonthArray = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    calendarMonth.textContent = getMonthArray[date.getMonth()];

    let numberDays = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    for(let i = 0; i < numberDays; i++){
        const day = document.createElement('div');
        day.classList.add("day");
        const dayNumber = document.createElement('p');
        dayNumber.textContent = i+1;
        calendar.appendChild(day);
        day.appendChild(dayNumber);
        
    }
  }
  
printDays();
  