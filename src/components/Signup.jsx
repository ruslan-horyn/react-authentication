import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexs';

export default function Signup() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { signup } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const errorAlert = error && <Alert variant='danger'>{error}</Alert>;
	const history = useHistory();

	const handleSubmit = async e => {
		e.preventDefault();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		const passwordConfirm = passwordConfirmRef.current.value;

		if (password !== passwordConfirm) {
			return setError('Passswords do not match');
		}

		try {
			setError('');
			setLoading(true);
			await signup(email, password);
			history.push('/');
		} catch {
			setError('Faild to create an account');
		}
		setLoading(false);
	};

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-2'>Sign Up</h2>
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

						<Form.Group id='password-confirm'>
							<Form.Label>Password Comformation</Form.Label>
							<Form.Control
								type='password'
								ref={passwordConfirmRef}
								required></Form.Control>
						</Form.Group>

						<Button className='w-100' type='submit' disabled={loading}>
							Sign Up
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className='w-100 text-center mt-2'>
				Already have an account? <Link to='/login'>Log In</Link>
			</div>
		</>
	);
}
