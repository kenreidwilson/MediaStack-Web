import Media from '../types/Media';
import IMediaSearchQuery from '../types/IMediaSearchQuery';
import { useState } from 'react';
import useNavigation from '../hooks/useNavigation';
import BasePage from './BasePage';
import PageThumbnails from '../components/Thumbnail/PageThumbnails';
import ThumbnailPageSidebar from '../components/Sidebar/ThumbnailPageSidebar';
import ToggleableSidebar from '../components/Sidebar/ToggleableSidebar';
import MediaSearchForm from '../components/Forms/MediaSearchForm';
import MediaListUpdate from '../components/Media/MediaListUpdate';
import { Button } from 'react-bootstrap';

export default function ThumbnailPageComponent() {
    
    const { getNavigationData } = useNavigation();
    const [mediaQuery, setMediaQuery] = useState<IMediaSearchQuery>(getNavigationData());
    const [mediaList, setMediaList] = useState<Media[]>([]);
    const [showRightSidebar, setShowRightSidebar] = useState<boolean>(false);
    const [showEditSidebar, setShowEditSidebar] = useState<boolean>(false);

    const TopBar = (): JSX.Element => (
        <div style={{ textAlign: 'center' }}>
            
        </div>
    );

    const RightSide = (): JSX.Element => (
        <div>

        </div>
    );

    const LeftSide = (): JSX.Element => (
        <div style={{ margin: '0 5px 0 5px', display: 'flex', flexDirection: 'column', marginRight: '5px'}}>
            <div style={{ marginRight: '10px' }}>
                <Button variant='primary' onClick={() => setShowRightSidebar(s => !s)}>Sidebar</Button>
            </div>
            <ToggleableSidebar width={400} isShown={showRightSidebar} setIsShown={setShowRightSidebar}>
                <ThumbnailPageSidebar 
                    mediaQuery={mediaQuery}
                    setMediaQuery={setMediaQuery}
                    onToggleEditMode={() => { setShowEditSidebar(m => !m); !showEditSidebar && setShowRightSidebar(false); }}/>
            </ToggleableSidebar>
        </div>
    );

    const MainBody = (): JSX.Element => (
        <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'center' }}>
        {showEditSidebar ? 
            <MediaListUpdate mediaList={mediaList}/> :
            <PageThumbnails
                mediaQuery={mediaQuery}
                mediaPerPage={10}
                mediaList={mediaList}
                setMediaList={setMediaList}
                isInfinite={+getNavigationData()['p'] === -1}/>}
        </div>
    );

    return ( 
        <BasePage>
            <div>
                <div style={{ display: 'flex' }}>
                    {LeftSide()}
                    <div>
                        {TopBar()}
                        {MainBody()}
                    </div>
                    {RightSide()}
                </div>
            </div>
        </BasePage>
     );
}
