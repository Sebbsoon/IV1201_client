import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LogInView } from './Views/loginView';
import { SignUpView } from './Views/signUpView';
import { HomeView } from './Views/home';
function App() {
	//fetch("http://localhost:8001");
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<LogInView />}></Route>
				<Route path="/signup" element={<SignUpView />}></Route>
				<Route path="/home" element={<HomeView />}></Route>
			</Routes>
		</Router>
	);
}

export default App;
