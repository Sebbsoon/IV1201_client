import React, { useState } from 'react';
import '../Styling/styleSign.css';
import axios from 'axios';
const SERVER_URL = "https://iv1201-server.onrender.com"
//const SERVER_URL = 'http://localhost:8000';

/**
 *
 * @returns The page that is shown when the user tries to create an acount. If the signup is successful the page will be redirected to the
 * application form.
 */
export function SignUpView() {
	const [connErr, setConnErr] = useState(false);
	async function onSubmit(e) {
		e.preventDefault();

		const formData = new FormData(e.target);
		const { name, surname, pnr, email, username, password } =
			Object.fromEntries(formData.entries());

		try {
			const response = await axios.post(SERVER_URL + '/person/signup', {
				name,
				surname,
				pnr,
				email,
				username,
				password,
			});
			console.log(response);
			const token = response.data.success.token;
			localStorage.setItem('token', token);
			const role = response.data.success.person.role_id;
			localStorage.setItem('role', role);
			const person_id = response.data.success.person.person_id;
			localStorage.setItem('person_id', person_id);
			setConnErr(false)
			window.location.href = '/home?id=2';
		} catch (error) {
			console.error(error);
			setConnErr(true)
		}
	}
	return (
		<div className="flex-div">
			<form className="signUpForm" onSubmit={(e) => onSubmit(e)}>
				<div class="first-div">
					<input
						class="first-input"
						type="text"
						name="name"
						placeholder="first name"
					/>
				</div>
				<div class="last-div">
					<input
						class="last-input"
						type="text"
						name="surname"
						placeholder="last name"
					/>
				</div>
				<div class="pnr-div">
					<input
						class="pnr-input"
						type="text"
						name="pnr"
						placeholder="personal number"
					/>
				</div>
				<div class="email-div">
					<input
						class="email-input"
						type="email"
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
				<div>
					{connErr && <div>Connection error</div>}
				</div>
				<div class="submit-div">
					<input className="submit-input" type="submit" value="Submit" />
				</div>
			</form>

		</div>
	);
}
