import React, { useState } from 'react';
import '../Styling/styleSign.css';
import axios from 'axios';

const SERVER_URL = 'http://localhost:8000';

/**
 *
 * @returns The page that is shown when the user tries to create an acount. If the signup is successful the page will be redirected to the
 * application form.
 */
export function SignUpView() {
	const [errors, setErrors] = useState({});

	async function onSubmit(e) {
		e.preventDefault();

		const formData = new FormData(e.target);
		const { name, surname, pnr, email, username, password } =
			Object.fromEntries(formData.entries());

		const inputErrors = {};
		if (!name) {
			inputErrors.name = 'Please enter your first name';
		}
		if (!surname) {
			inputErrors.surname = 'Please enter your last name';
		}
		if (!pnr) {
			inputErrors.pnr = 'Please enter your personal number';
		}
		if (!email) {
			inputErrors.email = 'Please enter your email';
		}
		if (!username) {
			inputErrors.username = 'Please enter your username';
		}
		if (!password) {
			inputErrors.password = 'Please enter your password';
		}

		if (Object.keys(inputErrors).length > 0) {
			setErrors(inputErrors);
			return;
		}

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
			setErrors({});
			window.location.href = '/home?id=2';
		} catch (error) {
			console.error(error);
			setErrors({ connectionError: 'Connection error' });
		}
	}

	return (
		<div className="flex-div">
			<form className="signUpForm" onSubmit={(e) => onSubmit(e)} noValidate>
				<div class="first-div">
					<input
						class="first-input"
						type="text"
						name="name"
						placeholder="first name"
						required
					/>
					{errors.name && <div className="error">{errors.name}</div>}
				</div>
				<div class="last-div">
					<input
						class="last-input"
						type="text"
						name="surname"
						placeholder="last name"
						required
					/>
					{errors.surname && <div className="error">{errors.surname}</div>}
				</div>
				<div class="pnr-div">
					<input
						class="pnr-input"
						type="text"
						name="pnr"
						placeholder="personal number"
						required
					/>
					{errors.pnr && <div className="error">{errors.pnr}</div>}
				</div>
				<div class="email-div">
					<input
						class="email-input"
						type="email"
						name="email"
						placeholder="email"
						required
					/>
					{errors.email && <div className="error">{errors.email}</div>}
				</div>
				<div class="username-div">
					<input
						class="user-input"
						type="text"
						name="username"
						placeholder="username"
						required
					/>
					{errors.username && <div className="error">{errors.username}</div>}
				</div>
				<div class="password-div">
					<input
						class="pass-input"
						type="text"
						name="password"
						placeholder="password"
						required
					/>
					{errors.password && <div className="error">{errors.password}</div>}
				</div>
				{errors.connectionError && (
					<div className="error">{errors.connectionError}</div>
				)}
				<div class="submit-div">
					<input className="submit-input" type="submit" value="Submit" />
				</div>
			</form>
		</div>
	);
}
