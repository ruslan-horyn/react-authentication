import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContexs';
import { Container } from 'react-bootstrap';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import ForgatPassword from './components/ForgotPassword';
import UpdateProfile from './components/UpdateProfile';

function App() {
	return (
		<Container
			className='d-flex align-items-center justify-content-center '
			style={{ minHeight: '100vh' }}>
			<div className='w-100' style={{ maxWidth: 400 }}>
				<Router>
					<AuthProvider>
						<Switch>
							<PrivateRoute exact path='/' component={Dashboard} />
							<PrivateRoute path='/update-profile' component={UpdateProfile} />
							<Route path='/signup' component={Signup} />
							<Route path='/login' component={Login} />
							<Route path='/forgot-password' component={ForgatPassword} />
						</Switch>
					</AuthProvider>
				</Router>
			</div>
		</Container>
	);
}
export default App;
