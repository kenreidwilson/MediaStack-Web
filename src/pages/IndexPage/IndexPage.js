import React, { Component } from 'react';
import Navigation from '../../components/Navigation/Nav';
import SearchMenu from '../../components/SearchMenu/SearchMenu'

import './IndexPage.css';

export default class IndexPage extends Component {

    render() { 
        return ( 
            <React.Fragment>
                <Navigation />
                <div id="index_page_content">
                    <div id="index_search_menu">
                        <SearchMenu onSearch={(searchQuery) => this.props.history.push('/search', { searchQuery })}/>
                    </div>
                </div>
            </React.Fragment>
         );
    }
}

