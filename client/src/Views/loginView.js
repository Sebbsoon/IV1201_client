import React from 'react';
import '../Styling/style.css';
import axios from 'axios';
const SERVER_URL = "https://iv1201-server.onrender.com"

export function LogInView() {
	async function onSubmit(e) {
		e.preventDefault();
		const username = e.target.username.value;
		const password = e.target.password.value;
		const res = await axios.post(SERVER_URL+'/person/login', {
			username,
			password,
		});
		if (res.data.success.role_id === 1) {
			window.location.replace('/home?id=1');
		} else {
			window.location.replace('/home?id=2');
		}
		console.log(res);
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
					Don't have an account?{' '}
					<a href={SERVER_URL+"/signup"}>Create one</a>
				</p>
			</form>
		</div>
	);
}
