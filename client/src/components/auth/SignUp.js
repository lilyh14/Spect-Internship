import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { signup } from '../../actions/auth';
import PropTypes from 'prop-types';
import './auth.css';

const SignUp = ({ setAlert, signup, isAuthenticated }) => {
	const [ formInfo, setFormInfo ] = useState({
		name: '',
		email: '',
		password: '',
		passwordConfirm: ''
	});
	const { name, email, password, passwordConfirm } = formInfo;
	const onChange = (e) => setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== passwordConfirm) {
			setAlert('Passwords do not match', 'danger');
		} else {
			signup({ name, email, password });
		}
	};

	if (isAuthenticated) {
		// console.log(isAuthenticated+'test')
		return <Redirect to="/studentProfile/add" />
	}
	return (
		<Fragment>
			<div className="login-section">
			<div style={{textAlign: 'center', color: 'white', paddingTop: '30px'}}>
					<h1>Register as a Student</h1>
					<h5 style={{textAlign: 'center'}}>Register now to find Internships for you.</h5>
			</div>
			<div className="login-page">
				<div className="form">
					
					<form  onSubmit={(e) => onSubmit(e)}>
						
							<input
								type="text"
								placeholder="Name"
								name="name"
								value={name}
								onChange={(e) => onChange(e)}
								required
							/>
						
						
							<input
								type="email"
								placeholder="Email Address"
								name="email"
								value={email}
								onChange={(e) => onChange(e)}
								required
							/>
							
						
						
							<input
								type="password"
								placeholder="Password"
								name="password"
								minLength="6"
								value={password}
								onChange={(e) => onChange(e)}
								required
							/>
						
						
							<input
								type="password"
								placeholder="Confirm Password"
								name="passwordConfirm"
								minLength="6"
								value={passwordConfirm}
								onChange={(e) => onChange(e)}
								required
							/>
						
						
							<button className="btn">
								Register
							</button>
							<p className="message">
						Registered already? <Link to="/login"> Login</Link>
					</p>
					</form>
					
				</div>
			</div>
			</div>
		</Fragment>
	);
};

SignUp.propTypes = {
	setAlert: PropTypes.func.isRequired,
	signup: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, signup })(SignUp);
