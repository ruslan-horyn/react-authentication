import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexs';

export default function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const errorAlert = error && <Alert variant='danger'>{error}</Alert>;
	const history = useHistory();

	const handleSubmit = async e => {
		e.preventDefault();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		try {
			setLoading(true);
			setError('');
			await login(email, password);
			history.push('/');
		} catch (error) {
			setError('Faild to login');
		}
		setLoading(false);
	};

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-2'>Log In</h2>
					{errorAlert}
					<Form onSubmit={handleSubmit}>
						<Form.Group id='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type='email'
								ref={emailRef}
								required></Form.Control>
						</Form.Group>

						<Form.Group id='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								ref={passwordRef}
								required></Form.Control>
						</Form.Group>

						<Button className='w-100' type='submit' disabled={loading}>
							Log in
						</Button>
					</Form>
					<div className='w-100 text-center mt-3'>
						<Link to='/forgot-password'>Forgot Password?</Link>
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
