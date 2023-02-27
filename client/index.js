const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('login', async (event) => {
	event.preventDefault();

	const username = document.querySelector('#username').value;
	const password = document.querySelector('#password').value;

	fetch(
		'/login',
		{
			method: 'POST',
			headers: {
				Content: 'application/json',
			},
			body: JSON.stringify({ username, password }),
		}.then((res) => {
			if (res.success) {
				window.location.replace('/testing');
			} else {
				// this if fine
			}
		})
	);

	////const result = await response.json();
	//console.log('Hej');
	//if (result.success) {
	//	// handle success
	//} else {
	//	// handle error
	//}
});

//gör fler metoder för att skicka signup och application

