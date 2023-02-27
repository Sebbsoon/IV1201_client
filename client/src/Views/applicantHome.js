import React, { useState } from 'react';
import '../Styling/styleapp.css';
import axios from 'axios';

export function ApplicantHome() {
	const [submitSuccess, setSubmitSuccess] = useState(false);

	async function onSubmit(e) {
		e.preventDefault();

		const formData = new FormData(e.target);
		const {
			firstname,
			lastname,
			email,
			competence1,
			competence2,
			competence3,
		} = Object.fromEntries(formData.entries());

		try {
			const response = await axios.post(
				'http://localhost:3000/person/application',
				{
					firstname,
					lastname,
					email,
					competence1,
					competence2,
					competence3,
				}
			);
			console.log(response.data);

			setSubmitSuccess(true);
		} catch (error) {
			console.error(error);
		}
	}

	const url = 'http://localhost:3001/apply';

	const [competencies, setCompetencies] = useState([
		{ competency: 'Ticket Sales', yearsOfExperience: '', isChecked: false },
		{ competency: 'lotteries', yearsOfExperience: '', isChecked: false },
		{
			competency: 'roller coaster operation',
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

	return (
		<div>
			<form onSubmit={onSubmit}>
				<p>Hej?</p>
				<div className="fname">
					<label htmlFor="name">First name:</label>
					<input type="text" id="firstname" name="firstname" required />
				</div>
				<div className="lname">
					<label htmlFor="email">Last name:</label>
					<input type="lastname" id="lastname" name="lastname" required />
				</div>
				<div className="mail">
					<label htmlFor="phone">Email:</label>
					<input type="email" id="email" name="email" required />
				</div>

				{competencies.map((comp, index) => (
					<div key={index} className="comp">
						<label htmlFor={`yearsOfExperience-${index}`}>
							{comp.competency}
						</label>
						<label className="container">
							<input
								type="checkbox"
								checked={comp.isChecked}
								onChange={(e) => handleCheckboxChange(index, e.target.checked)}
							/>
							<span className="checkmark"></span>
						</label>
						<label htmlFor={`yearsOfExperience-${index}`}>
							Years of experience:
						</label>
						<input
							type="number"
							id={`yearsOfExperience-${index}`}
							name={`yearsOfExperience-${index}`}
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
				) : (
					<button type="submit">Submit</button>
				)}
			</form>
		</div>
	);
}
