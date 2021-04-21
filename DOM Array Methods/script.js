//Variables from the DOM
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

//Money formatter
const moneyFormatter = (amount) => {
	return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

//Add new obj to data arr
const addData = (obj) => {
	data.push(obj);
	updateDOM();
};

//Fetch random user and add money

const getRandomUser = async () => {
	const res = await fetch('https://randomuser.me/api');
	const data = await res.json();

	const user = data.results[0];

	const newUser = {
		name: `${user.name.first} ${user.name.last}`,
		age: user.dob.age,
		money: Math.floor(Math.random() * 1000000),
	};
	addData(newUser);
};

//Double money
const doubleMoney = () => {
	data = data.map((user) => {
		return { ...user, money: user.money * 2 };
	});

	updateDOM();
};

//Sort Money by richest
const sortMoney = () => {
	data.sort((a, b) => b.money - a.money);

	updateDOM();
};

//Show only millionaires
const onlyMillionaires = () => {
	data = data.filter((user) => user.money > 1000000);
	updateDOM();
};

//Calculate total wealth
const totalWealth = () => {
	let sum = data.reduce((a, b) => {
		return a + b.money;
	}, 0);

	const element = document.createElement('div');
	element.innerHTML = `<h3> Total Wealth : <strong>${moneyFormatter(
		sum,
	)}</strong> </h3>`;
	main.appendChild(element);
	console.log(sum);
};

//Update DOM
const updateDOM = (providedData = data) => {
	//Clear main div
	main.innerHTML = `<tr><th>Name</th><th>Age</th><th>Wealth</th></tr>`;

	providedData.forEach((item, index, arr) => {
		// const element = document.createElement('div');
		// element.classList.add('person');
		// element.innerHTML = `<strong>${item.name}</strong> <strong>${item.age}</strong>${item.money}`;
		// main.appendChild(element);
		// element.innerHTML = `<strong>${item.name}</strong> <strong>${item.age}</strong>${item.money}`;
		// main.appendChild(element);
		const element = document.createElement('tr');
		element.innerHTML = `<td>${item.name}</td><td>${
			item.age
		}</td><td>$ ${moneyFormatter(item.money)}</td>`;
		main.appendChild(element);
	});
};

//Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortMoney);
showMillionairesBtn.addEventListener('click', onlyMillionaires);
calculateWealthBtn.addEventListener('click', totalWealth);
