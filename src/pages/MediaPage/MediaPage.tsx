import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner'

import Navigation from '../../components/Navigation/Nav';
import Media from '../../model/Media';
import MediaContainer from '../../components/Media/MediaContainer';
import MediaInfoSidebar from '../../components/MediaInfoSidebar/MediaInfoSidebar';
import BannerAlert from '../../components/BannerAlert/BannerAlert';
import MediaInfoEditModal from '../../components/MediaInfoEditModal/MediaInfoEditModal';

import { MediaInfoRequest, MediaInfoChangeRequest } from '../../api/requests/MediaRequests';
import MediaSearchQuery from '../../api/requests/RequestBodies/MediaSearchQuery';

import './MediaPage.css';

export default function MediaPage() {
    const [mediaInfo, setMediaInfo] = useState<Media | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [isMediaLoading, setIsMediaLoading] = useState(true);
    const [alerts, setAlerts] = useState<any[]>([]);

    useEffect(() => {
        var mediaIDString: string = new URL(window.location.href).searchParams.get("id") as string;
        var mediaID: number = +mediaIDString;
        new MediaInfoRequest(mediaID).send().then((response: Media) => {
            setMediaInfo(response);
        }).catch(error => { 
            setAlerts([...alerts, <BannerAlert variant="danger" heading="API Error:" body={error.message}/>]);
        });
    }, []);

    const handleScoreEdit = async (newScore: number) => {
        let media = mediaInfo as Media;
        if (media.score !== newScore) {
            await new MediaInfoChangeRequest(media.id, {'score' : newScore }).send().then(response => {
                setMediaInfo(response);
            }).catch(error => {
                setAlerts([...alerts, <BannerAlert variant="danger" heading="API Error:" body={error.message}/>]);
            })
        }
    }

    const handleModalSave = async (newMediaInfo: Media) => {
        let media = mediaInfo as Media;
        if (Object.keys(newMediaInfo).length > 0) {
            await new MediaInfoChangeRequest(media.id, newMediaInfo).send().then(response => {
                setMediaInfo(response);
            }).catch(error => {
                setAlerts([...alerts, <BannerAlert variant="danger" heading="API Error:" body={error.message}/>]);
            })
        }
        setShowEditModal(false);
    }

    return ( 
        <React.Fragment>
            {showEditModal ? 
                <MediaInfoEditModal 
                    isShown={showEditModal} 
                    onClose={() => setShowEditModal(false)}
                    onSave={handleModalSave}
                    media={mediaInfo as Media}/> 
                : null}
            <Navigation />
            {alerts.map(errorComponent => errorComponent)}
            <div id="mediapage">
                <div id="mediapage-sidebar">
                    {mediaInfo !== null ? 
                        <div>
                            <button className="edit_button btn btn-primary" onClick={() => setShowEditModal(true)}>Edit</button>
                            <MediaInfoSidebar
                                onSidebarNavClick={(searchQuery: MediaSearchQuery) => console.log(searchQuery)}
                                handleEdit={() => setShowEditModal(true)}
                                handleScoreEdit={handleScoreEdit}
                                media={mediaInfo}
                            /> 
                        </div>
                        : null}
                </div>
                <div id="mediapage-content">
                    {isMediaLoading ? <Spinner id="imageLoadingSpinner" animation="border" variant="primary" /> : null}
                    <MediaContainer media={mediaInfo as Media} onLoad={() => setIsMediaLoading(false)}/>
                </div>
            </div>
        </React.Fragment>
     );
}
