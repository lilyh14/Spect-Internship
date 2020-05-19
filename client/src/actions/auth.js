import axios from 'axios';
import {
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	BUSINESS_REGISTER_SUCCESS,
	USER_LOADED,
	BUSINESS_LOADED,
	AUTH_ERROR,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	BUSINESS_LOGIN_SUCCESS,
	LOGOUT
} from './types';
import { setAlert } from './alert';
import setAuthToken from './../utils/setAuthToken';
import { toast } from 'react-toastify';


export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('http://localhost:5008/api/auth');
		console.log('user load!!!!!');
		console.log(res.data);
		dispatch({
			type: USER_LOADED,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: AUTH_ERROR
		});
	}
};


// Student SignUp
export const signup = ({ name, email, password }) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	let business = false;
	const body = JSON.stringify({ name, email, password, business });

	try {
		const res = await axios.post('http://localhost:5008/api/users', body, config);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});
		dispatch(loadUser());
	} catch (err) {
		console.error("Error Signing Up: " + err);
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: REGISTER_FAIL
		});
	}
};

// Business Signup
export const businessSignup = ({ name, email, password }) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	let business = true;
	const body = JSON.stringify({ name, email, password, business });

	try {
		const res = await axios.post('http://localhost:5008/api/users', body, config);
		dispatch({
			type: BUSINESS_REGISTER_SUCCESS,
			payload: res.data
		});
		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: REGISTER_FAIL
		});
	}
};

// User Login
export const login = (email, password) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post('http://localhost:5008/api/auth', body, config);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		});
		console.log('user login!!!!!');
		console.log(res.data);
		dispatch(loadUser());
	} catch (err) {
		if(err.response){
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
			}
		}
		dispatch({
			type: LOGIN_FAIL
		});
	}
};


// User Logout

export const logout = () => (dispatch) => {
	dispatch({ type: LOGOUT });
	toast.info("Logged Out");
};
