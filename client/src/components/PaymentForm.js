import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';
import config from '../config';
import { toast } from 'react-toastify';

const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        fontFamily: 'Open Sans, sans-serif',
        letterSpacing: '0.025em',
        '::placeholder': {
          color: '#aab7c4',
        },
        border: '5px solid #000'
      },
      invalid: {
        color: '#c23d4b',
      },
    }
  }
};


class PaymentForm extends Component {
  constructor(props) {
    super(props);
    this.tryCharge = this.tryCharge.bind(this);
  }

  async tryCharge(ev) {
      ev.preventDefault();
    let {token} = await this.props.stripe.createToken({name: "Name"});
    if(token){
      axios.post(config.apiURL + "payments/charge", { token: token.id } ).then(success => {
          this.props.paymentComplete(success.data._id);
          toast.success("Successfully Charged Card");
      }).catch(error => {
          toast.error("Error Charging Card. Try Again.");
      });
    }else{
      toast.error("Error Charging Card");
    }
  
  }

  render() {
    return (
      <div className="checkout">
        <div className="col-md-6 border border-primary p-4">
          <h4>Total: { config.listingPrice } </h4>
          <p>Payment required prior to publishing Internship</p>
          <CardElement {...createOptions()}/>
          <br></br>
          <button onClick={this.tryCharge} className="btn btn-primary">Submit Payment</button>
        </div>
      </div>
    );
  }
}

export default injectStripe(PaymentForm);