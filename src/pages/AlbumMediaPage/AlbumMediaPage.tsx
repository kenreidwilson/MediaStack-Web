import React, { useState, useEffect } from 'react';

import Navigation from '../../components/Navigation/Nav';
import MediaInfoSidebar from '../../components/MediaInfoSidebar/MediaInfoSidebar';
import AlbumInfoSidebar from '../../components/MediaInfoSidebar/AlbumInfoSidebar';
import AlbumInfoEditModal from '../../components/AlbumInfoEditModal/AlbumInfoEditModal';
import BannerAlert from '../../components/BannerAlert/BannerAlert';
import Album from '../../model/Album';
import Media from '../../model/Media';

import MediaGallery from '../../components/MediaGallery/MediaGallery';
import MediaInfoEditModal from '../../components/MediaInfoEditModal/MediaInfoEditModal';
import DraggableMediaThumbnails from '../../components/MediaThumbnails/DraggableMediaThumbnails';
import { AlbumRepository } from '../../repositories/AlbumRepository';
import { MediaRepository } from '../../repositories/MediaRepository';

export default function AlbumMediaPage() {
    const [album, setAlbum] = useState<Album>();
    const [mediaList, setMediaList] = useState<Media[]>([]);
    const [selectedMediaIndex, setSelectedMediaIndex] = useState<number>(0);
    const [showMediaEditModal, setShowMediaEditModal] = useState<boolean>(false);
    const [showAlbumEditModal, setShowAlbumEditModal] = useState<boolean>(false);
    const [alerts, setAlerts] = useState<any[]>([]);

    const [isOrganizeMode, setIsOrganizeMode] = useState<boolean>(false);

    const mediaRepository = new MediaRepository();

    useEffect(() => {
        let albumIDString = new URL(window.location.href).searchParams.get("id") as string;
        let albumID = +albumIDString;
        new AlbumRepository().get(albumID).then(response => {
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

        
        mediaRepository.search({ albumID: album!.id, mode: 1, count: 999 }).then(response => {
            response.media.sort((a: Media, b: Media) => (a.albumOrder > b.albumOrder) ? 1 : -1);
            setMediaList(response.media);
        });
    }

    const toggleOrganize = () => {
        setIsOrganizeMode(!isOrganizeMode);
    }

    return ( 
        <React.Fragment>
            {album !== undefined && showAlbumEditModal ? 
                <AlbumInfoEditModal 
                    isShown={showAlbumEditModal} 
                    onClose={() => setShowAlbumEditModal(false)}
                    onSave={(album: Album) => {setAlbum(album); updateMediaList(album); setShowAlbumEditModal(false);}}
                    mediaList={mediaList}
                    album={album}
                /> 
                : null}
            {mediaList !== undefined && showMediaEditModal ?
                <MediaInfoEditModal
                    isShown={showMediaEditModal}
                    media={mediaList[selectedMediaIndex]}
                    onSave={(updatedMedia: Media) => {updateSelectedMedia(updatedMedia); setShowMediaEditModal(false);}}
                    onClose={() => setShowMediaEditModal(false)}
                /> 
                : null}
            <Navigation />
            {alerts.map(errorComponent => errorComponent)}
            <div id="mediapage">
                <div id="mediapage-sidebar">
                    {mediaList !== undefined && mediaList[selectedMediaIndex] !== undefined ? 
                        <div>
                            <button className="edit_button btn btn-primary" onClick={() => setShowMediaEditModal(true)}>Edit Media</button>
                            {mediaList.length > 0 ? <MediaInfoSidebar media={mediaList[selectedMediaIndex]} setMedia={updateSelectedMedia}/> : null }
                            <button className="edit_button btn btn-primary" onClick={() => setShowAlbumEditModal(true)}>Edit Album</button>
                            <AlbumInfoSidebar album={album!} setAlbum={setAlbum} mediaList={mediaList}updateMediaList={updateMediaList}/>
                            <button className="btn btn-primary" onClick={toggleOrganize}>Organize</button>
                        </div> : null}
                </div>
                {isOrganizeMode ? 
                    <OrganizeAlbumSection mediaList={mediaList} setMediaList={setMediaList} onSave={toggleOrganize}/> : 
                    <MediaGallery mediaList={mediaList} onMediaSelect={(selectedMediaIndex: number) => setSelectedMediaIndex(selectedMediaIndex)}/>}
            </div>
        </React.Fragment>
     );
}

type Props = {
    mediaList: Media[],
    setMediaList: Function,
    onSave: Function
}

function OrganizeAlbumSection({ mediaList, setMediaList, onSave }: Props ) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const mediaRepository = new MediaRepository();

    const handleSave = async () => {

        setIsLoading(true);
        for (let m of mediaList){
            await mediaRepository.update({ ID: m.id, albumOrder: mediaList.indexOf(m)});
        }
        setIsLoading(false);
        onSave();
    }

    return (
            <div>
                <DraggableMediaThumbnails mediaList={mediaList} onReorder={setMediaList}/>
                <button className="btn btn-primary" disabled={isLoading} onClick={handleSave}>Save</button>
            </div>
        );
}
