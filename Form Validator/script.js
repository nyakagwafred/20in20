const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Show input error
const showError = (input, message) => {
	const formControl = input.parentElement;
	formControl.className = 'form-control error';
	const small = formControl.querySelector('small');
	small.innerText = message;
};

//Show success outline
const showSuccess = (input) => {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
};

//Validate email
const validateEmail = (email) => {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

const checkPassword = (input) => {
	if (password2.value !== password.value) {
		showError(input, `Passwords do not match`);
	}
};

//Check required fields
const checkRequired = (inputArr) => {
	inputArr.forEach(function (input) {
		if (input.value.trim() === '') {
			showError(input, `Please enter ${input.name}`);
		} else if (input.name === 'email') {
			if (validateEmail(input.value)) {
				showSuccess(input);
			} else {
				showError(input, 'Invalid email');
			}
		} else if (input.name === 'password') {
			checkPassword(input);
		} else {
			showSuccess(input);
		}
	});
};

//Submit button event listener
form.addEventListener('submit', function (e) {
	e.preventDefault();
	checkRequired([username, email, password, password2]);
});
