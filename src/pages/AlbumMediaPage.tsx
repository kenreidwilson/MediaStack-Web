import { useState, useEffect } from 'react';
import MediaInfoSidebar from '../components/MediaInfoSidebar';
import AlbumInfoSidebar from '../components/AlbumInfoSidebar';
import AlbumInfoEditModal from '../components/AlbumInfoEditModal';
import Album from '../types/Album';
import Media from '../types/Media';

import MediaInfoEditModal from '../components/MediaInfoEditModal';
import DraggableMediaThumbnails from '../components/DraggableMediaThumbnails';
import { AlbumRepository } from '../repositories/AlbumRepository';
import { MediaRepository } from '../repositories/MediaRepository';
import MediaGallery from '../components/MediaGallery';
import BasePage from './BasePage';

export default function AlbumMediaPage() {
    const [album, setAlbum] = useState<Album>();
    const [mediaList, setMediaList] = useState<Media[]>([]);
    const [selectedMedia, setSelectdMedia] = useState<Media | undefined>(undefined);
    const [showMediaEditModal, setShowMediaEditModal] = useState<boolean>(false);
    const [showAlbumEditModal, setShowAlbumEditModal] = useState<boolean>(false);
    const [isOrganizeMode, setIsOrganizeMode] = useState<boolean>(false);

    const mediaRepository = new MediaRepository();

    useEffect(() => {
        let albumIDString = new URL(window.location.href).searchParams.get("id") as string;
        let albumID = +albumIDString;
        new AlbumRepository().get(albumID).then(response => {
            setAlbum(response);
            updateMediaList(response).then(mediaList => {
                if (mediaList !== undefined && selectedMedia === undefined) {
                    setSelectdMedia(mediaList[0]);
                }
            });
        }).catch(error => { 
            //setAlerts([...alerts, <MSBannerAlert variant="danger" heading="API Error:" body={error.message}/>]);
        });
        
    }, []);

    const updateSelectedMedia = (media: Media) => {
        let newMediaList: Media[] = [...mediaList];
        newMediaList[mediaList.indexOf(media)] = media;
        setMediaList(newMediaList);
    }

    const updateMediaList = async (album: Album) => {

        if (album === undefined) {
            return;
        }

        return mediaRepository.search({ albumID: album!.id, mode: 1, count: 999 }).then(response => {
            response.media.sort((a: Media, b: Media) => (a.albumOrder > b.albumOrder) ? 1 : -1);
            setMediaList(response.media);
            return response.media;
        });
    }

    const toggleOrganize = () => {
        setIsOrganizeMode(!isOrganizeMode);
    }

    return (
        <BasePage>
            <div id="mediapage">
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
                        media={selectedMedia!}
                        onSave={(updatedMedia: Media) => {updateSelectedMedia(updatedMedia); setShowMediaEditModal(false);}}
                        onClose={() => setShowMediaEditModal(false)}
                    /> 
                : null}
                <div id="mediapage-sidebar">
                    {mediaList !== undefined && selectedMedia !== undefined ? 
                        <div>
                            <button className="edit_button btn btn-primary" onClick={() => setShowMediaEditModal(true)}>Edit Media</button>
                            {mediaList.length > 0 ? <MediaInfoSidebar media={selectedMedia} setMedia={updateSelectedMedia}/> : null }
                            <button className="edit_button btn btn-primary" onClick={() => setShowAlbumEditModal(true)}>Edit Album</button>
                            <AlbumInfoSidebar album={album!} setAlbum={setAlbum} mediaList={mediaList}updateMediaList={updateMediaList}/>
                            <button className="btn btn-primary" onClick={toggleOrganize}>Organize</button>
                        </div> : null}
                </div>
                {selectedMedia !== undefined ? 
                    isOrganizeMode ? 
                        <OrganizeAlbumSection mediaList={mediaList} setMediaList={setMediaList} onSave={toggleOrganize}/> : 
                        <MediaGallery mediaList={mediaList} presentedMedia={selectedMedia} onPresentedMediaChange={setSelectdMedia}/> : null}
                
            </div>
        </BasePage>
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
