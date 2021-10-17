import SearchMenu from '../components/SearchMenu'
import useNavigation from '../hooks/useNavigation';
import { IMediaSearchQuery } from '../repositories/MediaRepository';
import BasePage from './BasePage';

import './IndexPage.css';

export default function IndexPage() {

    const { navigate } = useNavigation();

    return (
        <BasePage>
            <div id="index_page_content">
                <div id="index_search_menu">
                    <SearchMenu onSearch={(searchQuery: IMediaSearchQuery) => navigate("search", searchQuery)}/>
                </div>
            </div>
        </BasePage>
    );
};
