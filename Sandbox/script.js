const boxOne = document.getElementById('box1');
const boxTwo = document.getElementById('box2');
const boxThree = document.getElementById('box3');
const boxFour = document.getElementById('box4');
const boxFive = document.getElementById('box5');
const boxSix = document.getElementById('box6');

//Generate Random Number
const generateRandomNum = () => {
	boxOne.innerText = Math.floor(Math.random() * 10);
	boxTwo.innerText = Math.floor(Math.random() * 10);
	boxThree.innerText = Math.floor(Math.random() * 10);
	boxFour.innerText = Math.floor(Math.random() * 10);
	boxFive.innerText = Math.floor(Math.random() * 10);
	boxSix.innerText = Math.floor(Math.random() * 10);
};

generateRandomNum();

//let intervalOne = setInterval(generateRandomNum, 100);

for (let index = 0; index < 5; index++) {
	let timeoutOne = setTimeout(generateRandomNum, 1000);
	console.log('Timing');
}

//clearInterval(intervalOne);
