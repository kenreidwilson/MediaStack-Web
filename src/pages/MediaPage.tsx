import Media from '../types/Media';
import { useEffect, useState } from 'react';
import useMedia from '../hooks/useMedia';
import useNavigation from '../hooks/useNavigation';
import Spinner from 'react-bootstrap/Spinner'
import BasePage from './BasePage';
import MediaContainer from '../components/Media/MediaContainer';
import MediaInfoSidebar from '../components/Sidebar/MediaInfoSidebar';
import MediaInfoModal from '../components/Modals/MediaEditModal';

import './MediaPage.css';

export default function MediaPage() {
    const [media, setMedia] = useState<Media | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [isMediaLoading, setIsMediaLoading] = useState(true);

    const { getNavigationData } = useNavigation();
    const { get } = useMedia();

    useEffect(() => {
        let mediaID = getNavigationData();
        get(+mediaID['id']).then((response: Media) => {
            setMedia(response);
        }).catch(/*TODO: forwardRef BasePage and call addError here.*/);
    }, []);

    return ( 
        <BasePage>
            <div id='mediapage'>
                {media && 
                <MediaInfoModal 
                    media={media} 
                    isShown={showEditModal} 
                    onClose={() => setShowEditModal(false)}
                    onSave={(updatedMedia: Media) => {setMedia(updatedMedia); setShowEditModal(false)}}/>}
                    
                <div id='mediapage-sidebar'>
                    {media !== null ? 
                        <div>
                            <button className='edit_button btn btn-primary' onClick={() => setShowEditModal(true)}>Edit</button>
                            <MediaInfoSidebar media={media} setMedia={setMedia}/> 
                        </div>
                        : null}
                </div>
                <div id='mediapage-content'>
                    {isMediaLoading ? <Spinner id='imageLoadingSpinner' animation='border' variant='primary' /> : null}
                    <MediaContainer media={media as Media} onLoad={() => setIsMediaLoading(false)}/>
                </div>
            </div>
        </BasePage>
     );
}
