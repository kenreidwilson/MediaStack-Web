import React, { Component } from 'react';

class Nav extends Component {
    state = {
        NavElements : {
            "Media" : `/search?query=`,
            "Index" : `/`,
            "All"   : `/search?query`
        }
    }
    render() { 
        return (
            <div id="header">
                {Object.entries(this.state.NavElements).map( ([key, value]) => <a key={key} href={value}><h4>{` ${key} `}</h4></a>)}
            </div>
        );
    }
}
 
export default Nav;
