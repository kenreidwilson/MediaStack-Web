import React, { useState, useEffect } from 'react';

import Navigation from '../../components/Navigation/Nav';
import MediaInfoSidebar from '../../components/MediaInfoSidebar/MediaInfoSidebar';
import AlbumInfoSidebar from '../../components/MediaInfoSidebar/AlbumInfoSidebar';
import AlbumInfoEditModal from '../../components/AlbumInfoEditModal/AlbumInfoEditModal';
import BannerAlert from '../../components/BannerAlert/BannerAlert';
import Album from '../../model/Album';
import Media from '../../model/Media';

import { AlbumInfoRequest } from '../../api/requests/AlbumRequests';
import MediaSearchQuery from '../../api/requests/RequestBodies/MediaSearchQuery';
import { SearchRequest } from '../../api/requests/SearchRequests';
import MediaGallery from '../../components/MediaGallery/MediaGallery';

export default function AlbumMediaPage() {
    const [album, setAlbum] = useState<Album>();
    const [mediaList, setMediaList] = useState<Media[]>([]);
    const [selectedMediaIndex, setSelectedMediaIndex] = useState<number>(0);
    const [showEditModal, setShowEditModel] = useState<boolean>(false);
    const [alerts, setAlerts] = useState<any[]>([]);

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

    const updateSelectedMedia = (media: Media) => {
        let newMediaList: Media[] = [...mediaList];
        newMediaList[selectedMediaIndex] = media;
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
            {album !== undefined && showEditModal ? 
                <AlbumInfoEditModal 
                    isShown={showEditModal} 
                    onClose={() => setShowEditModel(false)}
                    onSave={(album: Album) => {setAlbum(album); updateMediaList(album); setShowEditModel(false);}}
                    mediaList={mediaList}
                    album={album}
                /> 
                : null}
            <Navigation />
            {alerts.map(errorComponent => errorComponent)}
            <div id="mediapage">
                <div id="mediapage-sidebar">
                    {mediaList !== undefined && mediaList[selectedMediaIndex] !== undefined ? 
                        <div>
                            <button className="edit_button btn btn-primary" onClick={() => setShowEditModel(true)}>Edit</button>
                            {mediaList.length > 0 ? 
                            <MediaInfoSidebar
                                media={mediaList[selectedMediaIndex]}
                                setMedia={updateSelectedMedia}
                            /> : null }
                            <AlbumInfoSidebar
                                album={album!}
                                setAlbum={setAlbum}
                                mediaList={mediaList}
                                setMedialist={setMediaList}
                            />
                        </div> : null}
                </div>
                <MediaGallery mediaList={mediaList} onMediaSelect={(selectedMediaIndex: number) => setSelectedMediaIndex(selectedMediaIndex)}/>
            </div>
        </React.Fragment>
     );
}
