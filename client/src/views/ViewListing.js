import React from 'react';
import axios from 'axios';
import config from '../config';
import Loader from 'react-loader-spinner';
import ReactHtmlParser from 'react-html-parser'; 
import {connect} from 'react-redux';


class ViewListing extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            edit: this.props.match.params.id ? this.props.match.params.id : false,
            markets: [],
            errorLoading: false,
            loading: true,

            //Lisitng Information
                title: '',
                description: '',
                requirements: '',
                market: '',
                industry: 'Engineering',
                published: false,
                compensation: 'Paid',
                duration: '1 Month',
                applicationLink: '',
                company:'',
                skills: [],

            //Business Profile Information
			    b_name: '',
			    b_description: '',
        }
        this.loadListing();
    }

    loadBusinessProfile() {
        console.log(this.state.company);
        axios
			.get(config.apiURL + 'businessProfile/' + this.state.company)
			.then((results) => {
				console.log(results);
				var listing = results.data;
				if (listing) {
					console.log(listing);
					this.setState({
						loading: false,
						b_name: listing.name,
						b_description: listing.description,
					});
				} else {
					this.setState({
						loading: false,
						errorLoading: true
					});
				}
			})
			.catch((error) => {
				console.error(error);
				this.setState({
					loading: false,
					errorLoading: true
				});
			});
	}

    loadMarkets(){
        axios.get(config.apiURL + "Market/").then(results => {
            console.log(results);
            this.setState({
                markets: results.data,
                loading: false
            });
            this.findMarket();
        }).catch(error => {
            console.error(error);
            this.setState({
                loading: false,
                errorLoading: true
            })
        });
    }

    findMarket(){
        var market = this.state.markets.find((market) =>{
            return market._id === this.state.market;
        });
        this.setState({
            market: market.name
        });
    }

    loadListing(){
        axios.get(config.apiURL + "Internship/" + this.state.edit).then(results => {
            console.log(results);
            var listing = results.data
            if(listing){
                console.log(listing);
                this.setState({
                    loading: false,
                    title: listing.title,
                    description: listing.description,
                    requirements: listing.requirements,
                    industry: listing.industry,
                    market: listing.market,
                    published: listing.published,
                    compensation: listing.compensation,
                    duration: listing.duration,
                    applicationLink: listing.applicationLink,
                    company: listing.company,
                    skills: listing.skills
                });
                this.loadMarkets();
                this.loadBusinessProfile();
            }else{
                this.setState({
                    loading: false,
                    errorLoading: true
                })
            }
            
        }).catch(error => {
            console.error(error);
            this.setState({
                loading: false,
                errorLoading: true
            })
        });
    }
    
    render() {

        if(this.state.errorLoading && !this.state.loading){
            return(
            <div className="container">
                <h1 className="text-danger text-center">Uh oh!</h1>
                <h5 className="text-danger text-center">There was an error loading this page. Try again.</h5>
            </div>
            );
        }else if(this.state.loading){
            return(
                <div className="container text-center">
                    <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={70}
                        width={70}
                         //3 secs

                    />
                <h1 className="text-secondary text-center">Loading....</h1>
                <h5 className="text-secondary text-center">Just a few more seconds...</h5>
            </div>
            );
        }else{
            var skills = "";
            this.state.skills.forEach(skill => {
                skills = skills + skill + ", "
            });
            skills = skills.substring(0, skills.length - 2);

            let applyButton = (<p style={{textAlign: 'center'}}><b>Please register or login to view application</b></p>);
            if(this.props.auth){
                if(this.props.auth.isAuthenticated){
                    applyButton = (<div className= "bg-transparent text-center pt-3 pb-3">
                        <a href = {this.state.applicationLink}
                        target = '_BLANK'
                        className = 'btn btn-primary'
                        >
                            Apply Now!
                        </a>
                    </div>);
                }
            }
            return (
            <div>

            <div className="column" className ="container">

                <h2 className="pt-4 pb-3">       
                    <a href =  {"/businessProfile/view/" + this.state.company}
                    className="text-body">
                        {this.state.b_name}
                    </a> - {this.state.title}</h2>
                <hr></hr>

                <div style={ { margin: 10 + 'px' }}>  

                <div className = "row" style={ { margin: 20 + 'px' }}>
                    <h5 className= "text-left w-25">Description: </h5>     
                    <div className="col text-left"> { ReactHtmlParser (this.state.description) } </div>
                </div>
                <hr></hr>

                <div className="row" style={ { margin: 20 + 'px' }}>
                    <h5 className= "text-left w-25">Requirements: </h5>
                    <div className="col text-left"> { ReactHtmlParser (this.state.requirements) } </div>
                </div>
                <hr></hr>

                <div className = "row" style={ { margin: 20 + 'px' }}>
                    <h5 className="text-left w-25" >Industry: </h5>
                    <p className="col text-left">{this.state.industry}</p>
                </div>
                <hr></hr>

                <div className = "row" style={ { margin: 20 + 'px' }}>
                    <h5 className="text-left w-25" >Market: </h5>
                    <p className="col text-left">{this.state.market}</p>
                </div>
                <hr></hr>

                <div className = "row" style={ { margin: 20 + 'px' }}>
                    <h5 className="text-left w-25">Compensation: </h5>
                    <p className="col text-left">{this.state.compensation}</p>
                </div>
                <hr></hr>

                <div className = "row" style={ { margin: 20 + 'px' }}>
                    <h5 className="text-left w-25">Duration: </h5>
                    <p className="col text-left">{this.state.duration}</p>
                </div>
                <hr></hr>

                <div className = "row" style={ { margin: 20 + 'px' }}>
                    <h5 className="text-left w-25">Preferred Soft Skills: </h5>
                    <p className="col text-left">
                        { skills }
                    </p>
                </div>
                <hr></hr>

                </div>

                { applyButton }

                <hr></hr>
            </div>

            <div className="column container pb-5" >

                <div className = "row" style={ { margin: 15 + 'px' }}>
                    <h5 className="text-left w-25">About {this.state.b_name}:</h5>
                    <p className="col text-left pr-5">{this.state.b_description}</p>

                    <div className= "bg-transparent text-center">
                    <a href = {"/businessProfile/view/" + this.state.company}
                    className = 'btn btn-secondary'
                    >
                        Learn More
                    </a>
                    </div>
                </div>

            </div>

            </div>
            )
        }
    }
}

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

export default connect(mapStateToProps)(ViewListing);
