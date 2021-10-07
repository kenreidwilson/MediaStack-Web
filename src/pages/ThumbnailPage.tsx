import { useContext } from 'react';
import PageThumbnails from '../components/PageThumbnails';
import { MediaContext } from '../contexts/MediaContext';
import BasePage from './BasePage';

export default function ThumbnailPageComponent() {
    const { getQuery } = useContext(MediaContext);

    return ( 
        <BasePage>
            <PageThumbnails
                    baseQuery={getQuery()}
                    linkToAlbums={getQuery().mode === 2}
                    mediaPerPage={30}/>
        </BasePage>
     );
}
