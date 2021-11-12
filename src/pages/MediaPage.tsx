import Media from '../types/Media';
import { useEffect, useState } from 'react';
import useMedia from '../hooks/useMedia';
import useNavigation from '../hooks/useNavigation';
import usePlatform from '../hooks/usePlatform';
import Spinner from 'react-bootstrap/Spinner';
import { Button } from 'react-bootstrap';
import BasePage from './BasePage';
import MediaContainer from '../components/Media/MediaContainer';
import MediaInfoSidebar from '../components/Sidebar/MediaInfoSidebar';
import MediaInfoModal from '../components/Modals/MediaEditModal';

export default function MediaPage() {
    const [media, setMedia] = useState<Media | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [isMediaLoading, setIsMediaLoading] = useState(true);

    const { getNavigationData } = useNavigation();
    const { get } = useMedia();

    const { isMobile } = usePlatform();

    useEffect(() => {
        let mediaID = getNavigationData();
        get(+mediaID['id']).then((response: Media) => {
            setMedia(response);
        }).catch(/*TODO: forwardRef BasePage and call addError here.*/);
    }, []);

    return ( 
        <BasePage>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row-reverse' }}>
                {media && 
                <MediaInfoModal 
                    media={media} 
                    isShown={showEditModal} 
                    onClose={() => setShowEditModal(false)}
                    onSave={(updatedMedia: Media) => {setMedia(updatedMedia); setShowEditModal(false)}}/>}
                    
                <div style={{ width: '100%' }}>
                    {isMediaLoading && 
                        <Spinner 
                            animation='border' 
                            variant='primary' 
                            style={{ width: '75px', height: '75px', position: 'absolute', margin: '17.5% 42.5%' }}/>}
                    {media !== null && <MediaContainer style={{ maxHeight: '100vh' }} media={media} onLoad={() => setIsMediaLoading(false)}/>}
                </div>
                <div style={{ width: isMobile ? '100%' : '350px' }}>
                    {media && <>
                        <Button style={{ marginTop: '5px', width: '100%'}} variant='primary' onClick={() => setShowEditModal(true)}>Edit</Button>
                        <MediaInfoSidebar media={media} /></>}
                </div>
            </div>
        </BasePage>
     );
}
