import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { PropTypes } from 'prop-types';
import './auth.css';
import { toast } from 'react-toastify';

const Login = ({ login, isAuthenticated, auth}) => {
	const [ formInfo, setFormInfo ] = useState({
		email: '',
		password: ''
	});
	const { email, password } = formInfo;
	const onChange = (e) => setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
	const onSubmit = async (e) => {
		e.preventDefault();
		login(email, password);
	};
	if(isAuthenticated){
		toast.success("Logged in");
		if(auth.user){
			if(!auth.user.profile){
				if(auth.user.business){
					return <Redirect to="/businessProfile/add"></Redirect>
				}else{
					return <Redirect to="/studentProfile/add"></Redirect>
				}
			}else{
				if(auth.user.business){
					return <Redirect to={"/businessListings/view/" + auth.user.profile}></Redirect>
				}else{
					return <Redirect to="/listing"></Redirect>
				}
			}

		}
	}
	// localStorage.clear();
	return (
		<Fragment>
			<div className="login-section">
				<div className="login-page">
					<div className="form">
						<form className="login-form" onSubmit={(e) => onSubmit(e)}>
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

							<button className="btn btn-primary uppercase">LOG IN</button>
						</form>
						<p className="message">
							Don't have an account? <Link to="/signup">Create Account </Link>
						</p>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
