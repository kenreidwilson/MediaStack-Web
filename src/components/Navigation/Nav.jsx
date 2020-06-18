import React, { Component } from 'react';

import NavOptionsButton from './NavOptionsButton/NavOptionsButton';
import NavSideDrawer from './NavSideDrawer/NavSideDrawer';
import Backdrop from '../Backdrop/Backdrop';

import './Nav.css';

export default class Nav extends Component {
    state = {
        navElements : {
            "Index" : `/`,
            "Search" : `/search`,
            "Upload" : `/upload`,
            "Login" : `/login`
        },
        sideDrawerOpen : false
    }

    navOptionsButtonClickHandler = () => {
        this.setState((previousState) => {
            return {sideDrawerOpen: !previousState.sideDrawerOpen}
        });
    }

    backdropClickHandler = () => {
        this.setState({sideDrawerOpen : false })
    }

    render() { 
        return (
            <React.Fragment>
                <header id="nav_wrapper">
                    <nav id="nav">
                        <div id="nav_options_button">
                            <NavOptionsButton onClick={this.navOptionsButtonClickHandler}/>
                        </div>
                        <div id="nav_title"><a href="/">MediaStack</a></div>
                        <div className="nav_spacer"></div>
                        <div id="nav_items_wrapper">
                            <ul>
                                {Object.entries(this.state.navElements).map( ([key, value]) =><li><a key={key} href={value}>{` ${key} `}</a></li>)}
                            </ul>
                        </div>
                    </nav>
                </header>
                <NavSideDrawer navElements={this.state.navElements} isShown={this.state.sideDrawerOpen}/>
                {this.state.sideDrawerOpen ? <Backdrop onClick={this.backdropClickHandler}/> : null}
            </React.Fragment>
        );
    }
}
