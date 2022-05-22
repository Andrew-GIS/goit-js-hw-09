const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;
const intervalValue = 1000;

startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);

function onStartClick() {
	timerId = setInterval(() => {
		document.body.style.backgroundColor = color();
		let bgcolor = document.body.style.backgroundColor;
		console.log('color :>> ', bgcolor);
  }, intervalValue);
	
	startBtn.disabled = true;
}

function onStopClick() {
	clearInterval(timerId);
	startBtn.disabled = false;
}


let color = function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}