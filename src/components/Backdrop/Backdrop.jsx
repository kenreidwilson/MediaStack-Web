import React, { Component } from 'react';
import PropTypes from 'prop-types'; 

import './Backdrop.css'

export default class Backdrop extends Component {

    static propTypes = {
        onClick : PropTypes.func
    }

    render() { 
        return ( 
            <div id="backdrop" onClick={this.props.onClick}></div> 
        );
    }
}
