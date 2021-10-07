import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner'
import Media from '../types/Media';
import MediaContainer from '../components/MediaContainer';
import MediaInfoSidebar from '../components/MediaInfoSidebar';
import MediaInfoEditModal from '../components/MediaInfoEditModal';

import './MediaPage.css';
import { MediaRepository } from '../repositories/MediaRepository';
import BasePage from './BasePage';

export default function MediaPage() {
    const [media, setMedia] = useState<Media | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [isMediaLoading, setIsMediaLoading] = useState(true);

    useEffect(() => {
        var mediaIDString: string = new URL(window.location.href).searchParams.get("id") as string;
        var mediaID: number = +mediaIDString;
        new MediaRepository().get(mediaID).then((response: Media) => {
            setMedia(response);
        }).catch(error => { 
            //setAlerts([...alerts, <MSBannerAlert variant="danger" heading="API Error:" body={error.message}/>]);
        });
    }, []);

    return ( 
        <BasePage>
            <div id="mediapage">
                {media ? 
                <MediaInfoEditModal media={media as Media} isShown={showEditModal} onClose={() => setShowEditModal(false)}
                    onSave={(updatedMedia: Media) => {setMedia(updatedMedia); setShowEditModal(false)}}/>
                : null}
                <div id="mediapage-sidebar">
                    {media !== null ? 
                        <div>
                            <button className="edit_button btn btn-primary" onClick={() => setShowEditModal(true)}>Edit</button>
                            <MediaInfoSidebar media={media} setMedia={setMedia}/> 
                        </div>
                        : null}
                </div>
                <div id="mediapage-content">
                    {isMediaLoading ? <Spinner id="imageLoadingSpinner" animation="border" variant="primary" /> : null}
                    <MediaContainer media={media as Media} onLoad={() => setIsMediaLoading(false)}/>
                </div>
            </div>
        </BasePage>
     );
}
