import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

const submitBtn = document.querySelector('button[type="submit"]');
const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');

form.addEventListener('submit', onSubmitClick);

function onSubmitClick(event) {
  event.preventDefault();

  let delayValue = Number(delay.value);
  let stepValue = Number(step.value);
  let amountValue = Number(amount.value);
  
  console.log('delayValue :>> ', delayValue);
  console.log('stepValue :>> ', stepValue);
  console.log('amountValue :>> ', amountValue);

  for (let i = 1; i <= amountValue; i += 1){
    console.log('i iteration :>> ', i);
    createPromise(i, delayValue)
      .then(({position, delay}) => Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`))
    .catch(({position, delay}) => Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`))
   delayValue += stepValue;
  }
}

function createPromise(position, delay) { 
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        return resolve({ position, delay });
      } else {
        return reject({ position, delay });
      }
    }, delay);
  });
}