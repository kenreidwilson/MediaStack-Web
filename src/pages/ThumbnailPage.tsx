import { Media, MediaSearchQuery } from '../types';
import { useRef, useState } from 'react';
import useNavigation from '../hooks/useNavigation';
import usePlatform from '../hooks/usePlatform';
import { Button } from 'react-bootstrap';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BasePage from './BasePage';
import PageThumbnails from '../components/PageComponents/PageThumbnails';
import ThumbnailPageSidebar from '../components/Sidebar/ThumbnailPageSidebar';
import ToggleableSidebar from '../components/Sidebar/ToggleableSidebar';
import MediaListUpdate from '../components/Media/MediaListUpdate';


export default function ThumbnailPageComponent() {
    
    const { getNavigationData } = useNavigation();
    const { isMobile } = usePlatform();

    const [mediaQuery, setMediaQuery] = useState<MediaSearchQuery>(getNavigationData());
    const [mediaList, setMediaList] = useState<Media[]>([]);
    const [showRightSidebar, setShowRightSidebar] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

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
            <div style={{ paddingLeft: '5px' }}>
                <Button variant='primary' onClick={() => setShowRightSidebar(s => !s)}>
                    <FontAwesomeIcon style={{ fontSize: '20px'}} icon={faBars} />
                </Button>
            </div>
            <ToggleableSidebar width={380} isShown={showRightSidebar} setIsShown={setShowRightSidebar}>
                <ThumbnailPageSidebar 
                    mediaQuery={mediaQuery}
                    setMediaQuery={setMediaQuery}
                    onToggleEditMode={() => { setIsEditMode(m => !m); !isEditMode && setShowRightSidebar(false); }}/>
            </ToggleableSidebar>
        </div>
    );

    const MainBody = (): JSX.Element => (
        <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'center' }}>
        {isEditMode ? 
            <MediaListUpdate 
                mediaList={mediaList} 
                onSave={setMediaList} 
                onCancel={() => setIsEditMode(false)}/> :
            <PageThumbnails
                mediaQuery={mediaQuery}
                mediaPerPage={30}
                mediaList={mediaList}
                setMediaList={setMediaList}
                isInfinite={+getNavigationData()['p'] === -1}/>}
        </div>
    );

    return ( 
        <BasePage>
            <div>
                <div style={{ display: 'flex' }}>
                    {!isMobile && LeftSide()}
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
