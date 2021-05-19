import React from 'react';
import MediaSearchQuery from '../../api/requests/RequestBodies/MediaSearchQuery';
import Navigation from '../../components/Navigation/Nav';
import SearchMenu from '../../components/SearchMenu/SearchMenu'

import './IndexPage.css';

const IndexPage = () => (
    <React.Fragment>
        <Navigation />
        <div id="index_page_content">
            <div id="index_search_menu">
                <SearchMenu onSearch={(searchQuery: MediaSearchQuery) => console.log(searchQuery)}/>
            </div>
        </div>
    </React.Fragment>
);

export default IndexPage;

