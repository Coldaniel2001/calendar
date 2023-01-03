const calendarMonth = document.getElementById("calendar-month");
function printDays() {
    const date = new Date();
    console.log(date);
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
        calendarMonth.appendChild(day);
        day.appendChild(dayNumber);
        
    }
  }
  
printDays();
  