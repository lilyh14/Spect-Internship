import React from 'react';
import axios from 'axios';

import config from '../config';
import './AllListings.css';
import  Truncate from 'react-truncate';


class AllListings extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: this.props,
            markets: [],
            errorLoading: false,
            loading: true,
            listings: [],
            market: 'ALL MARKETS'
        };
        this.loadListing();
        this.loadMarkets(); 
    }

    loadListing() {
        axios.get(config.apiURL + "Internship/").then(results => {
            console.log(results);
            var listings = results.data;
            listings.forEach(listing => {
                listing.description = listing.description.replace(/<[^>]+>/g,"")
                
            });
            if (listings) {
                console.log(listings);
                this.setState({
                    loading: false,
                    listings: listings
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

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        console.log("Name: " + name + " Value: " + value);
        this.setState({
            [name]: value
        });
    }

    loadMarkets(){
        axios.get(config.apiURL + "Market/").then(results => {
            console.log(results);
            this.setState({
                markets: results.data,
                loading: false,
            });
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
                <div className="container" style={{paddingTop: '30px', paddingBottom: '30px'}}>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="form-group">
                                <label htmlFor="market">Filter Market</label>
                                <select className="form-control" name="market" value={this.state.market} onChange={this.handleInputChange.bind(this)} required >
                                    <option value="ALL MARKETS" key="ALL MARKETS">ALL MARKETS</option>
                                        {
                                            this.state.markets.map(market => {
                                                if(market.published){
                                                    return (<option value={market._id} key={market._id}>{ market.name} </option>);  
                                                }else{
                                                    return '';
                                                }
                                            })
                                        }
                                </select>
                            </div>
                        </div>
                        <div className="col-md-9">
                            { this.state.listings.map((listing, index) => {
                                console.log(listing.market + " " + this.state.market);
                                if(listing.market===this.state.market || this.state.market === "ALL MARKETS"){
                                    return(
                                        <div key={listing._id} className="card text-center" style={{width: "90%", marginBottom: '15px'}}>                                    
                                            <li className="list-group-item" key={index}>
                                                <a href={'/listing/view/' + listing._id}>
                                                    <h5 className="card-title" >
                                                        {listing.title}
                                                    </h5>
                                                </a>
                                                <ul className="list-group list-group-flush">
                                                    <Truncate width={2080} ellipsis={<span>...</span>}>
                                                {listing.description}
                                                </Truncate>
                                                </ul>
                                            </li>
                                        </div>
                                    
                                        )
                                }else{
                                    return null;
                                }
                            })} 
                        </div>
                    </div>
                {/* <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">Next</a></li>
                    </ul>
                </nav> */}
            </div>
          

            );
        }else{
            return (<p>Loading...</p>);
        }
    }


}
export default AllListings;