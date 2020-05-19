import React from 'react';
import { logout } from '../../actions/auth';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

function Logout({logout}) {
    logout();
	return (
		<Redirect to="/logout/success"></Redirect>
    );
    
}

const mapStateToProps = (state) => {
    return({auth: state.auth})
};

export default connect(mapStateToProps, {logout})( Logout);
