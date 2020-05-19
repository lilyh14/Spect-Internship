import React from 'react';
import axios from 'axios';
import  Truncate from 'react-truncate';
import config from '../config';


class businessListings extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            
            view: this.props.match.params.id ? this.props.match.params.id : false,
            data: this.props,
            errorLoading: false,
            loading: true,
            listings: [],
            name: ''
        };
        this.loadBusinessInternships();
    }

    loadBusinessInternships() {
        axios.get(config.apiURL + "businessProfile/" + this.state.view +"/listings" ).then(results => { //Internship business ID? 
            console.log(results);
            var listings = results.data;
            if (listings) {
                console.log(listings);
                this.setState({
                    loading: false,
                    listings: listings,

                })
            } else {
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
        
        if(!this.state.loading){
            return (
               
                
                <div className="container text-center">
                     
                      {/* <div class="jumbotron text-center"> */}
                      <h1>Current Internship Listings</h1>
                {/* </div> */}
                <hr></hr>
                
                <div>
                    <ul>
                    <div className="form-group">
                    {/* <label htmlFor="name">Click to Edit Internship</label> */}
                    <br></br>
                        {this.state.listings.map((listing, index) => (
                    <div key={index} className ="card text-center" style={ { margin: 10 + 'px' }}>
                    <div className="card-body">
                         <h5 className="text-dark">{listing.title}</h5>
                         <hr width="80%"></hr>
                           <Truncate width = {2080} ellipsis={<span>...</span>}>
                           {/* <h6 className="text-dark">Description: </h6> */}<h7 className="text-muted"> {listing.description.replace(/<[^>]+>/g,"")} </h7>
                            </Truncate>
                        </div>
                   
                    <div className="card-footer text-center"> 
                    <a href={'/listing/view/' + listing._id} className="btn btn-primary">View Internship</a> 
                   &nbsp; 
                    <a href={'/listing/edit/' + listing._id} className="btn btn-info">Edit Internship</a> 
                    
                   
                    </div> 
                </div>
                        ))}
                        
                        </div>
                    </ul>

                    </div>
                </div>
            );
        }else{
            return (<p>Loading...</p>);
        }
    }


}

export default businessListings;