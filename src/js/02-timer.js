import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const timeInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysCounter = document.querySelector('span[data-days]');
const hoursCounter = document.querySelector('span[data-hours]');
const minutesCounter = document.querySelector('span[data-minutes]');
const secondsCounter = document.querySelector('span[data-seconds]');
const interval = 1000;
let timeBeforeMoment;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
	onClose(selectedDates) {
		if (Date.now() > selectedDates[0].getTime()) {
			Notify.failure('Please choose a date in the future');
			console.log('Please choose a date in the future ');
			startBtn.disabled = true;
		}
		else {
			startBtn.disabled = false;
			timeBeforeMoment = selectedDates[0];
		}
		console.log(selectedDates[0]);
		console.log('timeBeforeMoment :>> ', timeBeforeMoment.getTime());
  },
};


const calendar = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

class Timer {
  constructor({ onTick }) {
    this.interval = null;
    this.isActive = false;
    this.onTick = onTick;
  }
  startTimer() {
     if (this.isActive) {
        return;
    }
    const findingTime = timeBeforeMoment.getTime();
    this.isActive = true;
    this.interval = setInterval(() => {
      const currentTime = Date.now();
      const differenceInTime = findingTime - currentTime;
      console.log(differenceInTime)
      const time = convertMs(differenceInTime);
      if (differenceInTime < 0) {
         clearInterval(this.interval);
            this.isActive = false;
            return;
      }
      this.onTick(time)
    }, interval)
  }
}

startBtn.addEventListener('click', ()=> {timer.startTimer()});

const timer = new Timer({ onTick: updateTimeValues });

function updateTimeValues({ days, hours, minutes, seconds }) {
	daysCounter.textContent = addLeadingZero(days);
	hoursCounter.textContent = addLeadingZero(hours);
	minutesCounter.textContent = addLeadingZero(minutes);
	secondsCounter.textContent = addLeadingZero(seconds);
}