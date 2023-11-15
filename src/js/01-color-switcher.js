const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
  };
  
  refs.startBtn.addEventListener('click', onStartChangeColor);
  refs.stopBtn.addEventListener('click', onStopChangeColor);
  
  let timeID = null;
  
  function onStartChangeColor() {
    timeID = setInterval(() => {
      const randomColor = getRandomHexColor();
      refs.body.style.backgroundColor = randomColor;
    }, 1000);
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
  }
  
  function onStopChangeColor() {
    clearInterval(timeID);
    refs.stopBtn.disabled = true;
    refs.startBtn.disabled = false;
  }
  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
  }