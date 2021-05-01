const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const localStorageTransactions = JSON.parse(
	localStorage.getItem('transactions'),
);

let transactions =
	localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

const moneyFormatter = (amount) => {
	return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

// Add transactions to DOM
const addTransactionDOM = (transaction) => {
	//Get sign
	const sign = transaction.amount < 0 ? '-' : '+';
	const item = document.createElement('li');
	//Add class based on value
	item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
	item.innerHTML = `${transaction.text}<span>KES ${sign}${moneyFormatter(
		Math.abs(transaction.amount),
	)}</span><button onClick="removeTransaction(${
		transaction.id
	})" class="delete-btn">X</button>`;
	list.appendChild(item);
};

//Update local storage transaction
const updateLocalStorage = () => {
	localStorage.setItem('transactions', JSON.stringify(transactions));
};

//Remove transaction
const removeTransaction = (id) => {
	transactions = transactions.filter((transaction) => transaction.id !== id);
	updateLocalStorage();
	init();
};

//Get balance, total expense, total income
const getTotals = () => {
	//Total balance
	const totalBal = transactions.reduce((a, b) => {
		return a + b.amount;
	}, 0);

	balance.innerHTML = `KES: ${moneyFormatter(totalBal)}`;

	//Total Income
	const totalIncome = transactions
		.filter((transaction) => transaction.amount > 0)
		.reduce((a, b) => {
			return a + b.amount;
		}, 0);
	money_plus.innerHTML = `${moneyFormatter(totalIncome)}`;

	//Total Expense
	const totalExpense = transactions
		.filter((transaction) => transaction.amount < 0)
		.reduce((a, b) => {
			return a + b.amount;
		}, 0);
	money_minus.innerHTML = `${moneyFormatter(totalExpense)}`;
};

const init = () => {
	list.innerHTML = '';
	//Poulate DOM
	transactions.forEach((transaction) => {
		addTransactionDOM(transaction);
	});
	getTotals();
};

//Add transaction event listener
document.getElementById('btn').addEventListener('click', (e) => {
	e.preventDefault();
	if (text.value.trim() === '' || amount.value.trim() === '') {
		alert('Enter all values');
	} else {
		transactions.push({
			id: Math.floor(Math.random() * 1000),
			text: text.value,
			amount: +amount.value,
		});
		text.value = '';
		amount.value = '';

		updateLocalStorage();
	}

	init();
});

init();

//Add delete transaction event listener
