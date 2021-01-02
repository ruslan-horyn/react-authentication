import React, { useState } from 'react';
import { Alert, Button, Card } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexs';

export default function Dashboard() {
	const [error, setError] = useState('');
	const { currentUser, logout } = useAuth();
	const errorAlert = error && <Alert variant='danger'>{error}</Alert>;
	const history = useHistory();

	const handleLogOut = async () => {
		setError('');

		try {
			await logout();
			history.push('/login');
		} catch {
			setError('Failed to log out');
		}
	};
	return (
		<>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-2'>Profile</h2>
					{errorAlert}
					<strong>Email: </strong>
					{currentUser.email}
					<Link to='/update-profile' className='btn btn-primary w-100 mt-3'>
						Update Profile
					</Link>
				</Card.Body>
			</Card>

			<div className='w-100 text-center mt-2'>
				<Button variant='link' onClick={handleLogOut}>
					Log Out
				</Button>
			</div>
		</>
	);
}
