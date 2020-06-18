import React, { Component } from 'react';
import PropTypes from 'prop-types'; 

import './NavOptionsButton.css'

export default class NavOptionsButton extends Component {

    static propTypes = {
        onClickHandler : PropTypes.func
    }

    render() { 
        return ( 
            <button id="nav_options_button" onClick={this.props.onClick}>
                <div className="nav_options_button_line" />
                <div className="nav_options_button_line" />
                <div className="nav_options_button_line" />
            </button>
         );
    }
}
