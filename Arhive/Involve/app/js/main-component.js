class MainComponent {
  constructor() {
    this.cache = {};
    this.init();
  }

  init() {
    this.initializeCache();

    let enterDate = {
      year: 2019,
      month: 11,
      date: 0
    };

    this.generateCalendar(
      this.countDaysOfMonth(enterDate.year, enterDate.month),
      this.whatDayOfWeek(
        new Date(enterDate.year, enterDate.month, enterDate.date)
      ),
      enterDate.month,
      enterDate.year
    );
  }

  initializeCache() {
    this.cache.mainComponent = "js-main-component";
  }

  countDaysOfMonth(year, month) {
    let date = new Date(year, month + 1, 0);
    let countDays = date.getDate();
    let arrDays = [];

    for (let i = 1; i < countDays + 1; i++) {
      arrDays.push(i);
    }
    return arrDays;
  }

  whatDayOfWeek(date) {
    let day = date.getDay();
    return day + 1;
  }

  generateCalendar(arrDays, startDay, startMonth, startYear) {
    let stateCalendar = {
      dateFirstSelected: false,
      dateSecondSelected: false,
      firstElementID: null,
      secondElementID: null,
      dateFirst: "",
      dateSecond: ""
    };
    let arrDaysLength = arrDays.length;
    let calendar = document.getElementById("calendar");
    for (let i = 1; i < startDay; i++) {
      let div = document.createElement("div");
      div.className = `calendar__days-item calendar__days-item--null`;
      calendar.appendChild(div);
    }
    for (let i = 1; i < arrDaysLength + 1; i++) {
      let div = document.createElement("div");
      div.setAttribute("num-day-id", `${i}`);
      if (i < 10) {
        i = "0" + i;
      }
      div.className = `calendar__days-item day-${i} js-calendars-days-item`;
      div.innerHTML = `${i}`;

      div.setAttribute("num-day", `${i}`);
      div.setAttribute("num-month", startMonth);
      div.setAttribute("num-year", startYear);
      calendar.appendChild(div);
      div.addEventListener("click", function() {
        let day = this.getAttribute("num-day");
        let month = this.getAttribute("num-month");
        if (month < 10) {
          month = "0" + month;
        }
        let year = this.getAttribute("num-year");

        let dateFirstField = document.querySelector(".js-calendar-date-start");
        let dateSecondField = document.querySelector(".js-calendar-date-end");
        if (
          stateCalendar.dateFirstSelected === true &&
          stateCalendar.dateSecondSelected === true
        ) {
          stateCalendar.dateFirstSelected = false;
          stateCalendar.dateSecondSelected = false;
        }

        if (
          stateCalendar.dateFirstSelected === true &&
          stateCalendar.dateSecondSelected === false
        ) {
          this.classList.add("calendar__days-item-end");
          stateCalendar.dateSecondSelected = true;

          stateCalendar.secondElementID = this.getAttribute("num-day-id");
          document.querySelector(
            ".js-calendar-date-end"
          ).innerHTML = `${day}.${month}.${year}`;

          for (
            let i = stateCalendar.firstElementID;
            i < stateCalendar.secondElementID;
            i++
          ) {
            document
              .querySelector(`.js-calendars-days-item[num-day-id="${i}"]`)
              .classList.add("calendar__days-item-range");
          }
        }
        if (
          stateCalendar.dateFirstSelected === false &&
          stateCalendar.dateSecondSelected === false
        ) {
          this.classList.add("calendar__days-item-start");
          stateCalendar.dateFirstSelected = true;

          stateCalendar.firstElementID = this.getAttribute("num-day-id");
          document.querySelector(
            ".js-calendar-date-start"
          ).innerHTML = `${day}.${month}.${year}`;
        }
      });
    }
  }
}

export default new MainComponent();
