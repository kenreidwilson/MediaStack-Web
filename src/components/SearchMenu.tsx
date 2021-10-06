import { useState } from 'react';
import { IMediaSearchQuery } from '../repositories/MediaRepository';
import MediaSearchForm from './MediaSearchForm';

import './SearchMenu.css';

type Props = {
    onSearch: Function
}

export default function SearchMenu({ onSearch }: Props) {

    const [searchQuery, setSearchQuery] = useState<IMediaSearchQuery>({ mode: 2 });
    const [showAdvancedOptions, setShowAdvancedOptions] = useState<boolean>(false);

    return (
        <div id="search_menu">
            <MediaSearchForm 
                query={searchQuery} 
                onChange={setSearchQuery}
                showSortBy={showAdvancedOptions}
                showType={showAdvancedOptions}
                showBlacklistTags={showAdvancedOptions}
                showAlbum={showAdvancedOptions}
                showArtist={showAdvancedOptions}
                showCategory={showAdvancedOptions}
                showRatingComparator={showAdvancedOptions}
                showRatingValue={showAdvancedOptions}/>
                
            <div>
                <button className="btn btn-primary" id="search_button" onClick={() => onSearch(searchQuery)}>Search</button>
                <a 
                    href="/#"
                    onClick={() => setShowAdvancedOptions(!showAdvancedOptions)} 
                    id="show_advanced_options_element">
                        {showAdvancedOptions ? "hide advanced options" : "show advanced options"}
                </a>
            </div>
        </div>
    );
}
