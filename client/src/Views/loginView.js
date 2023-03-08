import React, { useState } from 'react';
import '../Styling/style.css';
import axios from 'axios';

const SERVER_URL = 'http://localhost:8000';

/**
 *
 * @returns the page that makes it possible for both recruiter and applicant to log in
 * If they don't have username and password they can signup.
 * the page is redirected based on the role id.
 */

export function LogInView() {
	const [loginError, setLoginError] = useState(false);

	async function onSubmit(e) {
		e.preventDefault();
		const username = e.target.username.value;
		const password = e.target.password.value;

		try {
			const response = await axios.post(SERVER_URL + '/person/login', {
				username,
				password,
			});

			const token = response.data.success.token;
			localStorage.setItem('token', token);
			const role = response.data.success.person.role_id;
			localStorage.setItem('role', role);
			const person_id = response.data.success.person.person_id;
			localStorage.setItem('person_id', person_id);

			if (role === 1) {
				window.location.replace('/home?id=1');
			} else {
				window.location.replace('/home?id=2');
			}
		} catch (error) {
			console.log(error);
			setLoginError(true);
		}
	}

	return (
		<div>
			<form className="loginForm" onSubmit={(e) => onSubmit(e)}>
				<input
					className="username"
					type="text"
					name="username"
					placeholder="username"
				/>
				<input
					className="pass"
					type="text"
					name="password"
					placeholder="password"
				/>
				<button type="submit">Login</button>
				<p>
					Don't have an account?
					<a href={'/signup'}>Create one</a>
				</p>
				{loginError && <p>Oops! Login failed. Please try again.</p>}
			</form>

		</div>
	);
}
