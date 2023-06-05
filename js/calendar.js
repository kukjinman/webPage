import { setClickedDate } from "./todo.js";

function calendar_init() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        selectMirror: true,

        events: [],
        dateClick: function (info) {
            console.log('Clicked on: ' + info.dateStr);
            // addEvent(info.date);
            setClickedDate(info.dateStr);
        }
    });



    calendar.render();
}

function addEvent(event) {
    calendar.addEvent(event);
}

document.addEventListener('DOMContentLoaded', calendar_init);