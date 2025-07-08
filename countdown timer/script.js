// Set your event date here (YYYY-MM-DDTHH:MM:SS)
const originalEventDate = new Date('2025-12-31T23:59:59').getTime();

let eventDate = originalEventDate;
let timerInterval = null;
let isRunning = true;

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');

function updateCountdown() {
  const now = new Date().getTime();
  const distance = eventDate - now;

  if (distance < 0) {
    clearInterval(timerInterval);
    daysEl.textContent = 0;
    hoursEl.textContent = 0;
    minutesEl.textContent = 0;
    secondsEl.textContent = 0;
    alert("Event Started!");
    startPauseBtn.disabled = true;
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}

function startTimer() {
  if (!timerInterval) {
    timerInterval = setInterval(updateCountdown, 1000);
    startPauseBtn.textContent = "Pause";
    isRunning = true;
  }
}

function pauseTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    startPauseBtn.textContent = "Start";
    isRunning = false;
  }
}

startPauseBtn.addEventListener('click', () => {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
});

resetBtn.addEventListener('click', () => {
  pauseTimer();
  // Reset eventDate to original
  eventDate = originalEventDate;
  updateCountdown();
  startTimer();
});

// Initialize
updateCountdown();
startTimer();
