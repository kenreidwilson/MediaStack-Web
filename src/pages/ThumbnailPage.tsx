import PageThumbnails from '../components/PageThumbnails';
import useNavigation from '../hooks/useNavigation';
import { IMediaSearchQuery } from '../repositories/MediaRepository';
import BasePage from './BasePage';

export default function ThumbnailPageComponent() {
    const { getNavigationData } = useNavigation();

    return ( 
        <BasePage>
            <PageThumbnails
                    baseQuery={getNavigationData() as IMediaSearchQuery}
                    linkToAlbums={(getNavigationData() as IMediaSearchQuery).mode === 2}
                    mediaPerPage={30}/>
        </BasePage>
     );
}
