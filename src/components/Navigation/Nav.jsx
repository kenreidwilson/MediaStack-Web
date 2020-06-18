import React, { Component } from 'react';

import './Nav.css'

class Nav extends Component {
    state = {
        NavElements : {
            "Media" : `/search`,
            "Index" : `/`,
            "All"   : `/search?query`
        }
    }

    render() { 
        return (
            <div id="nav">
                {Object.entries(this.state.NavElements).map( ([key, value]) => <a key={key} href={value}><h4>{` ${key} `}</h4></a>)}
            </div>
        );
    }
}
 
export default Nav;
