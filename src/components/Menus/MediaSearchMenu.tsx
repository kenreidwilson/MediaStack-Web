import IMediaSearchQuery from '../../types/IMediaSearchQuery';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import MediaSearchForm from '../Forms/MediaSearchForm';

type Props = {
    initialQuery?: IMediaSearchQuery,
    onQueryUpdate?: (query: IMediaSearchQuery) => void,
    onSearch?: (query: IMediaSearchQuery) => void
}

export default function MediaSearchMenu({ initialQuery = {}, onQueryUpdate = () => {}, onSearch = () => {} } : Props) {

    const [query, setQuery] = useState<IMediaSearchQuery>(initialQuery);
    const [showAdvancedOptions, setShowAdvancedOptions] = useState<boolean>(false);

    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        onQueryUpdate(query);
    }, [query]);

    return (
        <div style={{ margin: 'auto', width: '50%', display: 'flex', flexDirection: 'column' }}>
            <MediaSearchForm 
                query={query} 
                onChange={setQuery}
                showSortBy={showAdvancedOptions}
                showType={showAdvancedOptions}
                showBlacklistTags={showAdvancedOptions}
                showAlbum={showAdvancedOptions}
                showArtist={showAdvancedOptions}
                showCategory={showAdvancedOptions}
                showRatingComparator={showAdvancedOptions}
                showRatingValue={showAdvancedOptions}/>
                
            <div>
                <button style={{ marginTop: '5px' }} className='btn btn-primary' onClick={() => onSearch(query)}>Search</button>
                <a 
                    onClick={() => setShowAdvancedOptions(!showAdvancedOptions)} 
                    style={{ float: 'right', color: theme.style.primaryColor }}>
                        {showAdvancedOptions ? 'hide advanced options' : 'show advanced options'}
                </a>
            </div>
        </div>
    );
}
