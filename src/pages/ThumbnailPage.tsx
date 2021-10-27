import Media from '../types/Media';
import IMediaSearchQuery from '../types/IMediaSearchQuery';
import { useState } from 'react';
import useNavigation from '../hooks/useNavigation';
import BasePage from './BasePage';
import PageThumbnails from '../components/Thumbnail/PageThumbnails';
import MediaThumbnailsSidebar from '../components/Sidebar/MediaThumbnailsSidebar';
import ToggleableSidebar from '../components/Sidebar/ToggleableSidebar';
import MediaSearchForm from '../components/Forms/MediaSearchForm';
import MediaListUpdate from '../components/Media/MediaListUpdate';

export default function ThumbnailPageComponent() {
    
    const { getNavigationData } = useNavigation();
    const [mediaQuery, setMediaQuery] = useState<IMediaSearchQuery>(getNavigationData());
    const [mediaList, setMediaList] = useState<Media[]>([]);
    const [showSearchSidebar, setShowSearchSidebar] = useState<boolean>(false);
    const [showEditSidebar, setShowEditSidebar] = useState<boolean>(false);

    return ( 
        <BasePage>
            <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex'}}>
                    <MediaThumbnailsSidebar 
                        onSearchQueryClick={() => setShowSearchSidebar(p => !p)}
                        onEditClick={() => setShowEditSidebar(p => !p)}/>
                    <ToggleableSidebar width={300} isShown={showSearchSidebar} setIsShown={setShowSearchSidebar}>
                        <MediaSearchForm query={mediaQuery} />
                    </ToggleableSidebar>
                </div>
                <div style={{ display: 'flex', width: '80%', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'center' }}>
                    {showEditSidebar ? 
                        <MediaListUpdate mediaList={mediaList}/> :
                        <PageThumbnails
                                mediaQuery={mediaQuery}
                                mediaPerPage={30}
                                mediaList={mediaList}
                                setMediaList={setMediaList}
                                isInfinite={+getNavigationData()['p'] === -1}/>}
                </div>
            </div>
        </BasePage>
     );
}
