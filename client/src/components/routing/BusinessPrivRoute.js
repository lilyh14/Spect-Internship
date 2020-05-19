import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const BusinessPrivRoute = ({ component: Component, auth: { isBusinessAuthenticated, loading }, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			!isBusinessAuthenticated && !loading ? <Redirect to="/businessLogin" /> : <Component {...props} />}
	/>
);

BusinessPrivRoute.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps)(BusinessPrivRoute);
