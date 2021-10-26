import IMediaSearchQuery from '../types/IMediaSearchQuery';
import { useContext, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import MediaSearchForm from './Forms/MediaSearchForm';

type Props = {
    onSearch: (query: IMediaSearchQuery) => void
}

export default function SearchMenu({ onSearch }: Props) {

    const [searchQuery, setSearchQuery] = useState<IMediaSearchQuery>({ mode: 2 });
    const [showAdvancedOptions, setShowAdvancedOptions] = useState<boolean>(false);

    const { theme } = useContext(ThemeContext);

    return (
        <div style={{ margin: 'auto', width: '50%', display: 'flex', flexDirection: 'column' }}>
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
                <button style={{ marginTop: '5px' }} className='btn btn-primary' onClick={() => onSearch(searchQuery)}>Search</button>
                <a 
                    onClick={() => setShowAdvancedOptions(!showAdvancedOptions)} 
                    style={{ float: 'right', color: theme.style.primaryColor }}>
                        {showAdvancedOptions ? 'hide advanced options' : 'show advanced options'}
                </a>
            </div>
        </div>
    );
}
