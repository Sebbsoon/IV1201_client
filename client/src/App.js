import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from 'react-router-dom';
import { LogInView } from './Views/loginView';
import { SignUpView } from './Views/signUpView';
import { HomeView } from './Views/home';
import { Link } from 'react-router-dom';
import '../src/Styling/first.css';

/**
 *
 * @returns different paths
 */

function App() {
	return (
		<div className="start-div">
			<Router>
				<Routes>
					<Route path="/login" element={<LogInView />} />
					<Route path="/signup" element={<SignUpView />} />
					<Route path="/home" element={<HomeView />} />
				</Routes>

				<RedirectButton />
			</Router>
		</div>
	);
}

/**
 *
 * @returns a button that is shown when client starts up that will redirect to the login page.
 */

function RedirectButton() {
	const location = useLocation();

	if (location.pathname === '/') {
		return (
			<button
				className="first-button"
				onClick={() => window.location.replace('/login')}
			>
				Welcome to our tivoli! Click me to get to the login page!
			</button>
		);
	}

	return null;
}

export default App;
