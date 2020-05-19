import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	BUSINESS_REGISTER_SUCCESS,
	USER_LOADED,
	BUSINESS_LOADED,
	AUTH_ERROR,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	BUSINESS_LOGIN_SUCCESS,
	LOGOUT
} from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	isBusinessAuthenticated: null,
	loading: true,
	user: null
};

export default function(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				//  isBusinessAuthenticated: false,
				loading: false,
				user: payload
			};
		case BUSINESS_LOADED:
			return {
				...state,
				// isAuthenticated: false,
				isBusinessAuthenticated: true,
				loading: false,
				user: payload
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				isBusinessAuthenticated: false,
				loading: false
			};
		case BUSINESS_REGISTER_SUCCESS:
		case BUSINESS_LOGIN_SUCCESS:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				...payload,
				isBusinessAuthenticated: true,
				isAuthenticated: false,
				loading: false
			};
		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				isBusinessAuthenticated: false,
				loading: false
			};
		default:
			return state;
	}
}
