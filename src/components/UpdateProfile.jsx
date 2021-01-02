import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexs';

export default function UpdateProfile() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { currentUser, updateEmail, updatePassword } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const errorAlert = error && <Alert variant='danger'>{error}</Alert>;
	const history = useHistory();

	const handleSubmit = e => {
		e.preventDefault();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		const passwordConfirm = passwordConfirmRef.current.value;

		if (password !== passwordConfirm) {
			return setError('Passswords do not match');
		}

		setLoading(true);
		setError('');
		const promises = [];
		if (email !== currentUser.email) {
			promises.push(updateEmail(email));
		}

		if (password) {
			promises.push(updatePassword(password));
		}

		Promise.all(promises)
			.then(() => {
				history.push('/');
			})
			.catch(() => {
				setError('Faild to update account');
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-2'>Update profile</h2>
					{errorAlert}
					<Form onSubmit={handleSubmit}>
						<Form.Group id='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type='email'
								ref={emailRef}
								required
								defaultValue={currentUser.email}></Form.Control>
						</Form.Group>

						<Form.Group id='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								ref={passwordRef}
								placeholder='Leave blank to keep the same'></Form.Control>
						</Form.Group>

						<Form.Group id='password-confirm'>
							<Form.Label>Password Comformation</Form.Label>
							<Form.Control
								type='password'
								ref={passwordConfirmRef}
								placeholder='Leave blank to keep the same'></Form.Control>
						</Form.Group>

						<Button className='w-100' type='submit' disabled={loading}>
							Update
						</Button>
					</Form>
					<div className='w-100 text-center mt-3'>
						<Link to='/'>Cancel</Link>
					</div>
				</Card.Body>
			</Card>
		</>
	);
}
// aaa@aaa.pl 0j4twI$EC6l5
