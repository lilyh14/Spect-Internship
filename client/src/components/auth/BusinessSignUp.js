import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { businessSignup } from '../../actions/auth';
import PropTypes from 'prop-types';
import './auth.css';

const SignUp = ({ setAlert, businessSignup, isBusinessAuthenticated }) => {
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
			businessSignup({ name, email, password });
		}
	};

	if (isBusinessAuthenticated) {
		// console.log(isAuthenticated+'test')
		return <Redirect to="/businessProfile/add" />;
	}
	return (
		<Fragment>
			<div className="login-section">
				<div style={{textAlign: 'center', color: 'white', paddingTop: '30px'}}>
					<h1>Register your Company</h1>
					<h5 style={{textAlign: 'center'}}>Register now to post Internships for interested Students</h5>
				</div>
				<div className="login-page">
					<div className="form">
						<form onSubmit={(e) => onSubmit(e)}>
							<input
								type="text"
								placeholder=" Your Name"
								name="name"
								value={name}
								onChange={(e) => onChange(e)}
								required
							/>

							<input
								type="email"
								placeholder=" Business Email Address"
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

							<button className="btn">Register</button>
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
	businessSignup: PropTypes.func.isRequired,
	isBusinessAuthenticated: PropTypes.bool
};
const mapStateToProps = (state) => ({
	isBusinessAuthenticated: state.auth.isBusinessAuthenticated
});

export default connect(mapStateToProps, { setAlert, businessSignup })(SignUp);
