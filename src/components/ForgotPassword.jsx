import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexs';

export default function ForgotPassword() {
	const emailRef = useRef();
	const { resetPassword } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const errorAlert = error && <Alert variant='danger'>{error}</Alert>;
	const successMessade = message && <Alert variant='success'>{message}</Alert>;

	const handleSubmit = async e => {
		e.preventDefault();
		const email = emailRef.current.value;

		try {
			setMessage('');
			setError('');
			setLoading(true);
			await resetPassword(email);
			setMessage('Check your inbox for futher intruction');
		} catch (error) {
			setError('Faild to reset password');
		}
		setLoading(false);
	};

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-2'>Password Reset</h2>
					{successMessade}
					{errorAlert}
					<Form onSubmit={handleSubmit}>
						<Form.Group id='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type='email'
								ref={emailRef}
								required></Form.Control>
						</Form.Group>

						<Button className='w-100' type='submit' disabled={loading}>
							Reset Password
						</Button>
					</Form>
					<div className='w-100 text-center mt-3'>
						<Link to='/login'>Log In</Link>
					</div>
				</Card.Body>
			</Card>
			<div className='w-100 text-center mt-2'>
				Need an account? <Link to='/signup'>Sign Up</Link>
			</div>
		</>
	);
}
// aaa@aaa.pl 0j4twI$EC6l5
