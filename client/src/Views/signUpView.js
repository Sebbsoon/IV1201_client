import React from 'react';
import '../Styling/styleSign.css';
import axios from 'axios';

export function SignUpView() {
	async function onSubmit(e) {
		e.preventDefault();

		const formData = new FormData(e.target);
		const { firstname, lastname, email, username, password, personID } =
			Object.fromEntries(formData.entries());

		try {
			const response = await axios.post('http://localhost:3000/person/signup', {
				firstname,
				lastname,
				email,
				username,
				password,
				personID,
			});
			console.log(response.data);

			window.location.href = '/home?id=2';
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="flex-div">
			<form className="signUpForm" onSubmit={(e) => onSubmit(e)}>
				<div class="first-div">
					<input
						class="first-input"
						type="text"
						name="first-name"
						placeholder="first name"
					/>
				</div>
				<div class="last-div">
					<input
						class="last-input"
						type="text"
						name="last name"
						placeholder="last name"
					/>
				</div>
				<div class="email-div">
					<input
						class="email-input"
						type="text"
						name="email"
						placeholder="email"
					/>
				</div>

				<div class="username-div">
					<input
						class="user-input"
						type="text"
						name="username"
						placeholder="username"
					/>
				</div>

				<div class="password-div">
					<input
						class="pass-input"
						type="text"
						name="password"
						placeholder="password"
					/>
				</div>

				<div class="personID-div">
					<input
						class="personID-input"
						type="text"
						name="personID"
						placeholder="personID"
					/>
				</div>

				<div class="submit-div">
					<input className="submit-input" type="submit" value="Submit" />
				</div>
			</form>
		</div>
	);
}
