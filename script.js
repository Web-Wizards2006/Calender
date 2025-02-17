const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let currentDate = new Date();
let currentEventDate = null;  // Track which date the event modal is opened for

const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");
const monthYearLabel = document.getElementById("month-year");
const calendarGrid = document.querySelector(".calendar-grid");
const eventModal = document.getElementById("event-modal");
const saveEventBtn = document.getElementById("save-event");
const closeModalBtn = document.getElementById("close-modal");
const eventNote = document.getElementById("event-note");
const jumpToDateInput = document.getElementById("jump-to-date");

let events = {}; // Store events by date

// Update the calendar grid and display events
function updateCalendar() {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    
    // Update month/year display
    monthYearLabel.textContent = `${monthNames[month]} ${year}`;
    
    // Clear the previous calendar grid
    calendarGrid.innerHTML = `<div class="day-name">Sun</div><div class="day-name">Mon</div><div class="day-name">Tue</div><div class="day-name">Wed</div><div class="day-name">Thu</div><div class="day-name">Fri</div><div class="day-name">Sat</div>`;
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Generate the calendar days
    for (let i = 0; i < firstDay; i++) {
        calendarGrid.innerHTML += `<div></div>`; // Empty cells before the 1st of the month
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateCell = document.createElement("div");
        dateCell.classList.add("date");
        dateCell.textContent = day;

        // Highlight today's date
        if (day === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
            dateCell.classList.add("today");
        }

        // Highlight date with events
        if (events[day]) {
            dateCell.classList.add("event-added"); // Add class for highlighting
        }

        // Show event modal on click
        dateCell.addEventListener("click", () => showEventModal(day));

        calendarGrid.appendChild(dateCell);
    }
}

// Show event modal for adding events
function showEventModal(day) {
    eventModal.style.display = "flex";
    currentEventDate = day;  // Track the clicked date
    eventNote.value = events[day] || ''; // Pre-fill the event note if exists
}

// Save event and close the modal
function saveEvent() {
    if (currentEventDate !== null) {
        events[currentEventDate] = eventNote.value;  // Save the event for the clicked date
        updateCalendar();  // Re-render calendar to show saved event
    }
    closeModal();  // Close the modal after saving
}

// Close modal
function closeModal() {
    eventModal.style.display = "none";  // Hide the modal
    eventNote.value = '';  // Clear the event note for next use
    currentEventDate = null;  // Reset the current event date
}

// Navigate to the previous or next month
prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
});

nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
});

// Jump to a specific date
jumpToDateInput.addEventListener("change", () => {
    const selectedDate = new Date(jumpToDateInput.value);
    if (selectedDate instanceof Date && !isNaN(selectedDate)) {
        currentDate = selectedDate;
        updateCalendar();
    }
});

// Save event when the save button is clicked
saveEventBtn.addEventListener("click", saveEvent);

// Close the modal when the close button is clicked
closeModalBtn.addEventListener("click", closeModal);

// Initialize the calendar
updateCalendar();
