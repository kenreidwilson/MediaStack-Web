import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import SearchMenu from '../components/SearchMenu'
import { MediaContext } from '../contexts/MediaContext';
import { IMediaSearchQuery } from '../repositories/MediaRepository';
import BasePage from './BasePage';

import './IndexPage.css';

export default function IndexPage() {

    const history = useHistory();
    const { setQuery } = useContext(MediaContext);

    return (
        <BasePage>
            <div id="index_page_content">
                <div id="index_search_menu">
                    <SearchMenu onSearch={(searchQuery: IMediaSearchQuery) => {setQuery!(searchQuery); history.push('/search')}}/>
                </div>
            </div>
        </BasePage>
    );
};
