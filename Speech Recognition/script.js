const msgEL = document.getElementById("msg");

const getRandomNumber = () => {
  return Math.floor(Math.random() * 100) + 1;
};

const randomNum = getRandomNumber();

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

//Start recognition and game
recognition.start();

//Check msg against number

const checkNumber = (msg) => {
  const num = +msg;

  //Check if valid number
  if (Number.isNaN(num)) {
    msgEL.innerHTML = `<div>That is NOT a valid number</div>`;
    return;
  }

  //Check in range
  if (num > 100 || num < 1) {
    msgEL.innerHTML += `<div>Number must be between 1 and 100</div>`;
  }

  //Check number
  if (num === randomNum) {
    document.body.innerHTML = `<h2>CONGRTATS! You have guessed the numebr<br><br>
    It was ${num}</h2>
    <button class="play-again" id="play-again"> Play Again</button>`;
  } else if (num > randomNum) {
    msgEL.innerHTML = "<div>Go Lower</div>";
  } else {
    msgEL.innerHTML = "<div>Go Higher</div>";
  }
};

//Write what user speaks
const writeMessage = (msg) => {
  msgEL.innerHTML = `
    <div>You said : <div>
    <span class ='box'>${msg}</span>
    `;
};

// Capture user speak
const onSpeak = (e) => {
  const msg = e.results[0][0].transcript;
  writeMessage(msg);
  checkNumber(msg);
};

//Speak result
recognition.addEventListener("result", onSpeak);

//End SR service
recognition.addEventListener("end", () => {
  recognition.start();
});

document.body.addEventListener("click", () => {
  window.location.reload();
});
