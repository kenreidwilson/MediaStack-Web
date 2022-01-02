import { MediaSearchQuery } from '../../types';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import MediaSearchForm from '../Forms/MediaSearchForm';
import { Button } from 'react-bootstrap';

type Props = {
    initialQuery?: MediaSearchQuery,
    onQueryUpdate?: (query: MediaSearchQuery) => void,
    onSearch?: (query: MediaSearchQuery) => void
}

export default function MediaSearchMenu({ initialQuery = {}, onQueryUpdate = () => {}, onSearch = () => {} } : Props) {

    const [query, setQuery] = useState<MediaSearchQuery>(initialQuery);
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
                <Button style={{ marginTop: '5px' }} onClick={() => onSearch(query)}>Search</Button>
                <a 
                    onClick={() => setShowAdvancedOptions(!showAdvancedOptions)} 
                    style={{ float: 'right', color: theme.style.primaryColor }}>
                        {showAdvancedOptions ? 'hide advanced options' : 'show advanced options'}
                </a>
            </div>
        </div>
    );
}
