import React from 'react';
import axios from 'axios';
import config from '../config';
import Loader from 'react-loader-spinner'
import Truncate from 'react-truncate';

class ViewBusinessProfile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            view: this.props.match.params.id,
            errorLoading: false,
            loading: true,
            listing: [],

            //Business Profile Information
                name: '',
                address: '',
                description: '',
                website: '',
                email: '',

            // Listing Information
                L_title: '',
                L_description: '',
                L_applicationLink: '',
                L_company: ''
        };
        this.loadBusinessProfile();
    }

    loadBusinessProfile(){
        axios.get(config.apiURL + "businessProfile/" + this.state.view).then(results => {
            console.log(results);
            var listing = results.data
            if(listing){
                console.log(listing);
                this.setState({
                    loading: false,
                    name: listing.name,
                    address: listing.address,
                    description: listing.description,
                    website: listing.website,
                    email: listing.email,
                });
                this.loadListing();
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

    loadListing(){
        axios.get(config.apiURL + "businessProfile/" + this.state.view + "/listings").then(results => {
            console.log(results);
            var listing = results.data
            if(listing){
                console.log(listing);
                this.setState({
                    loading: false,
                    listing: listing
                });
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

    render(){
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
            return (
                <div className="container" style={{ margin: 25 + 'px' }}>
                    <h1>{this.state.name}</h1>
                    <div style={ { margin: 10 + 'px' }}>  
                        <div className = "row" style={ { margin: 20 + 'px' }}>
                            <h5 className = "text-left w-25">Description: </h5>     
                            <p className = "col text-left">{this.state.description}</p>
                        </div>
                        <hr></hr>
                        <div className = "row" style={ { margin: 20 + 'px' }}>
                            <h5 className= "text-left w-25">Address: </h5>     
                            <p className = "col text-left">{this.state.address}</p>
                        </div>
                        <hr></hr>
                        <div className = "row" style={ { margin: 20 + 'px' }}>
                            <h5 className = "text-left w-25">Contact E-mail: </h5>     
                            <p className = "col text-left">{this.state.email}</p>
                        </div>
                        <hr></hr>
                        <div className= "bg-transparent text-center">
                            <a href = {this.state.website} target = '_BLANK' className = 'btn btn-primary'>
                            Visit Webpage
                            </a>
                        </div>
                    </div>
                    <div className="container" style={{ marginBottom: 25 + 'px' }}>
                        <h2>Current Internships</h2>
                    </div>
                        {this.state.listing.map((listing, index) => (
                            <div key={index} className ="card" style={ { padding: 20 + 'px', margin: 20 + 'px' }}>
                                <div className="container">    
                                    <h5><b><a href={'/listing/view/' + listing._id}> <font color="black">{listing.title}</font></a></b></h5>
                                    <Truncate width = {2080} ellipsis={<span>...</span>}>
                                    {listing.description.replace(/<[^>]+>/g,"")}
                                    </Truncate>
                                </div>
                            </div>
                        ))}
                    </div>
            );
        }
    }
}
export default ViewBusinessProfile; 