import { setCurrentDate } from "./todo.js";

function calendar_init() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        selectMirror: false,

        events: [],
        dateClick: function (info) {
            console.log('Clicked on: ' + info.dateStr);
            // addEvent(info.date);
            setCurrentDate(info.dateStr);
        }
    });
    var today = new Date();
    // ISO 8601 표준 형식에서 날짜와 시간은 'T'로 구분
    //"2023-06-15T12:34:56.789Z"와 같은 문자열은 ["2023-06-15", "12:34:56.789Z"]와 같은 배열로 분리
    var formattedToday = today.toISOString().split('T')[0];
    setCurrentDate(formattedToday);

    calendar.render();
}

function addEvent(event) {
    calendar.addEvent(event);
}

document.addEventListener('DOMContentLoaded', calendar_init);