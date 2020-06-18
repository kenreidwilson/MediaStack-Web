import React, { Component } from 'react';
import PropTypes from 'prop-types'; 

import './NavSideDrawer.css'

export default class NavSideDrawer extends Component {

    static propTypes = {
        navElements: PropTypes.object.isRequired,
        isShown: PropTypes.bool.isRequired
    }

    render() { 
        return ( 
            <nav className={this.props.isShown ? "nav_side_drawer nav_side_drawer_shown" : "nav_side_drawer"}>
                <ul>
                    {Object.entries(this.props.navElements).map( ([key, value]) =><li><a key={key} href={value}>{` ${key} `}</a></li>)}
                </ul>
            </nav> 
        );
    }
}
