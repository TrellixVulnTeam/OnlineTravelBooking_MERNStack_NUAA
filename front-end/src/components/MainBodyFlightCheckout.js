import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logo from './../logo.png';
import StayUptoDate from './StayUptoDate';
import Carousal1 from './Carousal1';
import Carousal2 from './Carousal2';
import BeautifulDown from './BeautifulDown';
import FlightCheckoutDetails from './FlightCheckoutDetails';
var FontAwesome = require('react-fontawesome');

class MainBodyFlightCheckout extends Component {
  state={

  }
  render() {
    return (
      <div className="mainBodyFlightCheckout">
        <div className="main-pane-flightcheckout">
            <FlightCheckoutDetails flightTile={this.props.flightTile}  seat={this.props.seat} handleRedirectBooking2={this.props.handleRedirectBooking2}/>
        </div>

        <div className="right-pane-carcheckout">

        </div>
      </div>
);
  }
}

export default MainBodyFlightCheckout;
