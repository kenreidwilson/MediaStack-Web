import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MediaSearchQuery from '../../api/requests/RequestBodies/MediaSearchQuery';
import Navigation from '../../components/Navigation/Nav';
import SearchMenu from '../../components/SearchMenu/SearchMenu'
import { MediaContext } from '../../MediaContext';

import './IndexPage.css';

export default function IndexPage() {

    const history = useHistory();
    const {getQuery, setQuery} = useContext(MediaContext);

    return (
        <React.Fragment>
            <Navigation />
            <div id="index_page_content">
                <div id="index_search_menu">
                    <SearchMenu onSearch={(searchQuery: MediaSearchQuery) => {setQuery!(searchQuery); history.push('/search')}}/>
                </div>
            </div>
        </React.Fragment>
    );
};
