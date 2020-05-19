import React, { Fragment, useState } from 'react';

const LogoutSuccess = () => {
	return (
		<Fragment>
			<div className="login-section">
				<div className="login-page">
					<div className="form">
                        <h1>Successfully Logged Out</h1>
                        <h5>We're sad to see you go.</h5>
                        <a href="/login" className="btn btn-primary">Login</a> { '   '}
                        <a href="/home" className="btn btn-secondary">Home</a>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default (LogoutSuccess);
