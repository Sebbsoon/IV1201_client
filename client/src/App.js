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

/**
 *
 * @returns different paths
 */

function App() {
	return (
		<div>
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
			<button onClick={() => window.location.replace('/login')}>
				Welcome to our tivoli! Click the button to get to the login page!
			</button>
		);
	}

	return null;
}

export default App;
