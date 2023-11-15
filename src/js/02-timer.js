import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  timePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
};

const clockFace = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      Notify.failure('Please choose a date in the future', {
        timeout: '2000',
        clickToClose: true,
        position: 'center-top',
        distance: '20px',
      });
    } else {
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr(refs.timePicker, options);

refs.startBtn.disabled = true;
let countdown;

refs.startBtn.addEventListener('click', startTimer);

function startTimer() {
  countdown = setInterval(() => {
    const currentTime = Date.now();
    const targetTime = new Date(refs.timePicker.value).getTime();
    const diff = targetTime - currentTime;

    render(convertMs(diff));

    if (diff <= 0) {
      clearInterval(countdown);
      render({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }
  }, 1000);
}

function render({ days, hours, minutes, seconds }) {
  clockFace.days.textContent = addLeadingZero(days);
  clockFace.hours.textContent = addLeadingZero(hours);
  clockFace.minutes.textContent = addLeadingZero(minutes);
  clockFace.seconds.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}