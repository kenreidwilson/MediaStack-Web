import { useState } from 'react';
import PageThumbnails from '../components/PageThumbnails';
import useNavigation from '../hooks/useNavigation';
import { IMediaSearchQuery } from '../repositories/MediaRepository';
import Media from '../types/Media';
import BasePage from './BasePage';

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
                    isInfinite={+getNavigationData()["p"] === -1}/>
        </BasePage>
     );
}
