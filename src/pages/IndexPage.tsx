import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Navigation from '../components/Navigation';
import SearchMenu from '../components/SearchMenu'
import { MediaContext } from '../MediaContext';
import { IMediaSearchQuery } from '../repositories/MediaRepository';

import './IndexPage.css';

export default function IndexPage() {

    const history = useHistory();
    const {getQuery, setQuery} = useContext(MediaContext);

    return (
        <React.Fragment>
            <Navigation />
            <div id="index_page_content">
                <div id="index_search_menu">
                    <SearchMenu onSearch={(searchQuery: IMediaSearchQuery) => {setQuery!(searchQuery); history.push('/search')}}/>
                </div>
            </div>
        </React.Fragment>
    );
};
