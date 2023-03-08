import React from 'react';
import '../Styling/style.css';
import { ApplicantHome } from './applicantHome';
import RecruiterHome from './recruiterHome';

/**
 *
 * @returns which page to see based on user. either recruiter or applicant
 */

export function HomeView() {
	let params = window.location.href.split('?')[1].split('=')[1];
	if (params === '1') return <RecruiterHome />;
	else return <ApplicantHome />;
}
