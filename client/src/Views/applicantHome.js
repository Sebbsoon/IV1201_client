import React, { useState } from 'react';
import '../Styling/styleapp.css';
import axios from 'axios';
const SERVER_URL = "https://iv1201-server.onrender.com"
//const SERVER_URL = 'http://localhost:8000';

/**
 *
 * @returns the page that the applicant can see, to fill in with personal information, compotences and availability if they are authorized
 * to see the page, errors and authentications are handeled.
 */
export function ApplicantHome() {
	const [submitSuccess, setSubmitSuccess] = useState(false);
	const [availabilityFields, setAvailabilityFields] = useState([
		{ from: '', to: '' },
	]);
	const [authenticate, setAuthenticate] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	async function onSubmit(e) {
		e.preventDefault();

		const formData = new FormData(e.target);
		const {yearsOfExperience_0,yearsOfExperience_1,yearsOfExperience_2} = Object.fromEntries(
			formData.entries()
		);
		const person_id = parseInt(localStorage.getItem('person_id'));
		const competence = [
			{ competence_id: 1, years_of_experience: yearsOfExperience_0 },
			{ competence_id: 2, years_of_experience: yearsOfExperience_1 },
			{ competence_id: 3, years_of_experience: yearsOfExperience_2 },
		];
		const availability = availabilityFields;
		try {
			const response = await axios.post(SERVER_URL + '/application/create', {
				person_id,
				competence,
				availability,
			});
			console.log(response.data);
			if (response.data.success) setSubmitSuccess(true);
		} catch (error) {
			console.error(error);
			setErrorMessage(error);
			if (error.response.status === 404) {
				setErrorMessage('INVALID INPUT');
			}
		}
	}

	const addAvailabilityField = () => {
		setAvailabilityFields([...availabilityFields, { from: '', to: '' }]);
	};

	const updateAvailabilityField = (index, field, value) => {
		const updatedFields = [...availabilityFields];
		updatedFields[index][field] = value;
		setAvailabilityFields(updatedFields);
	};

	const [competencies, setCompetencies] = useState([
		{ competency: 'Ticket Sales', yearsOfExperience: '', isChecked: false },
		{ competency: 'Lotteries', yearsOfExperience: '', isChecked: false },
		{
			competency: 'Roller Coaster Operation',
			yearsOfExperience: '',
			isChecked: false,
		},
	]);

	const handleCompChange = (index, field, value) => {
		const updatedCompetencies = [...competencies];
		updatedCompetencies[index][field] = value;
		setCompetencies(updatedCompetencies);
	};

	const handleCheckboxChange = (index, isChecked) => {
		handleCompChange(index, 'isChecked', isChecked);
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
		return <div>unauttorized</div>;
	}
	if (role !== '2') {
		return <div>Applicants only</div>;
	} else {
		return (
			<div>
				<form onSubmit={onSubmit}>
					{availabilityFields.map((field, index) => (
						<div key={index} className="availability">
							<label htmlFor={`availabilityFrom-${index}`}>
								Availability from:
							</label>
							<input
								type="date"
								id={`availabilityFrom-${index}`}
								name={`availabilityFrom-${index}`}
								value={field.from_date}
								onChange={(e) =>
									updateAvailabilityField(index, 'from_date', e.target.value)
								}
								required
							/>
							<label htmlFor={`availabilityTo-${index}`}>
								Availability to:
							</label>
							<input
								type="date"
								id={`availabilityTo-${index}`}
								name={`availabilityTo-${index}`}
								value={field.to_date}
								onChange={(e) =>
									updateAvailabilityField(index, 'to_date', e.target.value)
								}
								required
							/>
						</div>
					))}
					<button type="button" onClick={addAvailabilityField}>
						Add Availability
					</button>

					{competencies.map((comp, index) => (
						<div key={index} className="comp">
							<label htmlFor={`yearsOfExperience_${index}`}>
								{comp.competency}
							</label>
							<label className="container">
								<input
									type="checkbox"
									checked={comp.isChecked}
									onChange={(e) =>
										handleCheckboxChange(index, e.target.checked)
									}
								/>
								<span className="checkmark"></span>
							</label>
							<label htmlFor={`yearsOfExperience_${index}`}>
								Years of experience:
							</label>
							<input
								type="number"
								id={`yearsOfExperience_${index}`}
								name={`yearsOfExperience_${index}`}
								value={comp.yearsOfExperience}
								onChange={(e) =>
									handleCompChange(index, 'yearsOfExperience', e.target.value)
								}
								disabled={!comp.isChecked}
							/>
						</div>
					))}

					{submitSuccess ? (
						<p>Successful submission!</p>
					) : errorMessage ? (
						<p>
							Something went wrong, you can't submit right now! Try again later!
						</p>
					) : (
						<button type="submit">Submit</button>
					)}
				</form>
			</div>
		);
	}
}
