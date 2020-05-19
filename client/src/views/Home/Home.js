import React from 'react';
import logo from '../../assets/logo.svg';
import './Home.css';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

function Home() {
	return (
		<div className="App">
			<header className="App-header">
				<img src="https://149360317.v2.pressablecdn.com/wp-content/uploads/2019/11/spect-white-logo-scaled.png" className="App-logo" alt="logo" />
				<hr></hr>
				<p className="text-white text-center" style={{ display: 'flex', flexDirection: 'column' }}>
					Connecting Students and Employers on Soft Skills that Matter
				</p>
				<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer" />
			</header>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	  };
};
export default connect(mapStateToProps)( Home);
