import Media from '../types/Media';
import IMediaSearchQuery from '../types/IMediaSearchQuery';
import { useState } from 'react';
import useNavigation from '../hooks/useNavigation';
import BasePage from './BasePage';
import PageThumbnails from '../components/Thumbnail/PageThumbnails';

export default function ThumbnailPageComponent() {
    
    const { getNavigationData } = useNavigation();

    const [mediaList, setMediaList] = useState<Media[]>([]);

    return ( 
        <BasePage>
            <PageThumbnails
                    mediaQuery={getNavigationData() as IMediaSearchQuery}
                    mediaPerPage={30}
                    mediaList={mediaList}
                    setMediaList={setMediaList}
                    isInfinite={+getNavigationData()['p'] === -1}/>
        </BasePage>
     );
}
