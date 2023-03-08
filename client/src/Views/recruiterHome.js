import axios from 'axios';
import React, { useState } from 'react';
//const SERVER_URL = "https://iv1201-server.onrender.com"
const SERVER_URL = 'http://localhost:8000';

/**
 *
 * @returns the page that the recruiter will see. There is a button "list" to see all the applications that exists.
 */

function RecruiterHome() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [authenticate, setAuthenticate] = useState(false);
	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const printList = () => {
		if (loading) {
			return <div>Loading...</div>;
		}
		if (data) {
			if (data.success) {
				return (
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Surname</th>
								<th>Email</th>
								<th>Ticket Sale</th>
								<th>Lotteries</th>
								<th>Roller Coaster Opperations</th>
								<th>Availability (From Date)</th>
								<th>Availability (To Date)</th>
							</tr>
						</thead>
						<tbody>
							{data.success.map((x) => (
								<tr key={x.person.person_id}>
									<td>{x.person.name}</td>
									<td>{x.person.surname}</td>
									<td>{x.person.email}</td>
									<td>{x.competence[0].years_of_experience}</td>
									<td>{x.competence[1].years_of_experience}</td>
									<td>{x.competence[2].years_of_experience}</td>
									<td>
										{x.availability.map((a, i) => (
											<div key={i}>
												<div>{a.from_date}</div>
											</div>
										))}
									</td>
									<td>
										{x.availability.map((a, i) => (
											<div key={i}>
												<div>{a.to_date}</div>
											</div>
										))}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				);
			}
			return <div>fail</div>;
		}
		//return <div>data is null</div>;
	};

	const handleButtonClick = async () => {
		setShowError(false)
		setLoading(true);
		try {
			setLoading(true);
			const response = await axios.get(SERVER_URL + '/application/list');
			console.log(response.data);
			setData(response.data);
		} catch (error) {
			console.error(error);
			setErrorMessage('Something went wrong');
			setShowError(true);
		} finally {
			setLoading(false);
		}
	};

	const token = localStorage.getItem('token');
	const role = localStorage.getItem('role');
	fetch(SERVER_URL + '/protected', {
		headers: { Authorization: `Bearer ${token}` },
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			if (data.success !== undefined) {
				setAuthenticate(true);
			}
		})

		.catch((error) => {
			console.log('Something went wrong');
			setErrorMessage('Something went wrong, try again later!');
			{
				errorMessage && <p>{errorMessage}</p>;
			}
		});

	if (!authenticate) {
		return <div>unauthorized</div>;
	}

	if (role !== '1') {
		return <div>Employees only</div>;
	} else {
		return (
			<div>
				<button onClick={handleButtonClick} disabled={loading}>
					List
				</button>
				{showError && <div>{errorMessage}</div>}
				{printList()}
			</div>
		);
	}
}

export default RecruiterHome;
