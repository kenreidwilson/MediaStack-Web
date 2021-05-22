import React, { useState, useEffect, useRef } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import Navigation from '../../components/Navigation/Nav';
import MediaContainer from '../../components/Media/MediaContainer';
import MediaInfoSidebar from '../../components/MediaInfoSidebar/MediaInfoSidebar';
import AlbumInfoSidebar from '../../components/MediaInfoSidebar/AlbumInfoSidebar';
import SelectableThumbnails from '../../components/SelectableThumbnails/SelectableThumbnails';
import SelectableThumbnailSlider from '../../components/SelectableThumbnailSlider/SelectableThumbnailSlider';
import AlbumInfoEditModal from '../../components/AlbumInfoEditModal/AlbumInfoEditModal';
import BannerAlert from '../../components/BannerAlert/BannerAlert';
import Album from '../../model/Album';
import Media from '../../model/Media';

import { AlbumInfoRequest } from '../../api/requests/AlbumRequests';
import MediaSearchQuery from '../../api/requests/RequestBodies/MediaSearchQuery';
import { SearchRequest } from '../../api/requests/SearchRequests';

export default function AlbumMediaPage() {
    const [album, setAlbum] = useState<Album>();
    const [mediaNumber, setMediaNumber] = useState<number>(0);
    const [mediaList, setMediaList] = useState<Media[]>([]);
    const [showEditModal, setShowEditModel] = useState<boolean>(false);
    const [isMediaLoading, setIsMediaLoading] = useState<boolean>(true);
    const [alerts, setAlerts] = useState<any[]>([]);

    const mediaNumberRef = useRef(-1);
    mediaNumberRef.current = mediaNumber;

    useEffect(() => {
        let albumIDString = new URL(window.location.href).searchParams.get("id") as string;
        let albumID = +albumIDString;
        new AlbumInfoRequest(albumID).send().then(response => {
            setAlbum(response);
            updateMediaList(response);
        }).catch(error => { 
            setAlerts([...alerts, <BannerAlert variant="danger" heading="API Error:" body={error.message}/>]);
        });
        
    }, []);
    
    const handleThumbnailClick = (index: number) => {
        if (mediaNumber === index) {
            return;
        }
        setMediaNumber(index);
        setIsMediaLoading(true);
    }

    const handleMediaClick = (event: JQuery.ClickEvent) => {
        if (event!.originalEvent!.x - event.target.offsetLeft >= event.target.width / 2) {
            setMediaNumber(mediaNumberRef.current === mediaList.length - 1 ? 0 : mediaNumberRef.current + 1);
        } else {
            setMediaNumber(mediaNumberRef.current === 0 ? mediaList.length - 1 : mediaNumberRef.current - 1);
        }
        setIsMediaLoading(true);
    }

    const setSelectedMediaObject = (media: Media) => {
        let newMediaList: Media[] = [...mediaList];
        newMediaList[mediaNumber] = media;
        setMediaList(newMediaList);
    }

    const updateMediaList = (album: Album) => {

        if (album === undefined) {
            return;
        }

        new SearchRequest(new MediaSearchQuery({ albumID: album!.id })).send().then(response => {
            setMediaList(response);
        });
    }

    return ( 
        <React.Fragment>
            {showEditModal ? 
                <AlbumInfoEditModal 
                    isShown={showEditModal} 
                    onClose={() => setShowEditModel(false)}
                    onSave={(album: Album) => {setAlbum(album); updateMediaList(album); setShowEditModel(false);}}
                    mediaList={mediaList}
                    album={album as Album}
                /> 
                : null}
            <Navigation />
            {alerts.map(errorComponent => errorComponent)}
            <div id="mediapage">
                <div id="mediapage-sidebar">
                    {typeof album !== 'undefined' && mediaNumber !== null ? 
                        <div>
                            <button className="edit_button btn btn-primary" onClick={() => setShowEditModel(true)}>Edit</button>
                            {mediaList.length > 0 ? 
                            <MediaInfoSidebar
                                media={mediaList[mediaNumber]}
                                setMedia={setSelectedMediaObject}
                            /> : null }
                            <AlbumInfoSidebar
                                album={album}
                                setAlbum={setAlbum}
                                mediaList={mediaList}
                                setMedialist={setMediaList}
                            />
                        </div> : null}
                </div>
                <div id="mediapage-content">
                    {typeof album !== 'undefined' && mediaList.length > 0 ? 
                        <div>
                            {isMediaLoading ? <Spinner id="imageLoadingSpinner" animation="border" variant="primary" /> : null}
                            <MediaContainer 
                                onLoad={() => setIsMediaLoading(false)}
                                onClick={(event: JQuery.ClickEvent) => handleMediaClick(event)}
                                media={mediaList[mediaNumber]}
                            />
                        </div>
                    : null}
                    {typeof album !== 'undefined' ? 
                        (global.matchMedia(`(min-width: 768px)`).matches ?
                            <SelectableThumbnailSlider 
                                mediaNumber={mediaNumber}
                                onThumbnailClick={handleThumbnailClick} 
                                mediaList={mediaList}/>
                            : <div id="thumbnails">
                                    <SelectableThumbnails
                                        mediaNumber={mediaNumber}
                                        onThumbnailClick={handleThumbnailClick} 
                                        mediaList={mediaList}/>
                            </div>
                        ) 
                        : null}
                </div>
            </div>
        </React.Fragment>
     );
}
