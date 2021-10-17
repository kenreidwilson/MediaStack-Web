import { useState, useEffect } from 'react';
import MediaInfoSidebar from '../components/MediaInfoSidebar';
import AlbumInfoSidebar from '../components/AlbumInfoSidebar';
import AlbumEditModal from '../components/AlbumEditModal';
import Album from '../types/Album';
import Media from '../types/Media';

import MediaInfoModal from '../components/MediaEditModal';
import DraggableMediaThumbnails from '../components/DraggableMediaThumbnails';
import MediaGallery from '../components/MediaGallery';
import BasePage from './BasePage';
import useAlbums from '../hooks/useAlbums';
import { useMedia } from '../hooks/useMedia';
import useNavigation from '../hooks/useNavigation';

export default function AlbumMediaPage() {
    const [album, setAlbum] = useState<Album>();
    const [mediaList, setMediaList] = useState<Media[]>([]);
    const [selectedMedia, setSelectdMedia] = useState<Media | undefined>(undefined);
    const [showMediaEditModal, setShowMediaEditModal] = useState<boolean>(false);
    const [showAlbumEditModal, setShowAlbumEditModal] = useState<boolean>(false);
    const [isOrganizeMode, setIsOrganizeMode] = useState<boolean>(false);

    const { get: getAlbum } = useAlbums();
    const { search: searchMedia } = useMedia();

    const { getNavigationData } = useNavigation();

    useEffect(() => {
        let albumID = +getNavigationData()['id'];
        getAlbum(albumID).then(response => {
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

        return searchMedia({ albumID: album!.id, mode: 1, count: 999 }).then(response => {
            response.data.sort((a: Media, b: Media) => (a.albumOrder > b.albumOrder) ? 1 : -1);
            setMediaList(response.data);
            return response.data;
        });
    }

    const toggleOrganize = () => {
        setIsOrganizeMode(!isOrganizeMode);
    }

    return (
        <BasePage>
            <div id="mediapage">
                {album !== undefined && showAlbumEditModal ? 
                    <AlbumEditModal 
                        isShown={showAlbumEditModal} 
                        onClose={() => setShowAlbumEditModal(false)}
                        onSave={(album: Album) => {setAlbum(album); updateMediaList(album); setShowAlbumEditModal(false);}}
                        mediaList={mediaList}
                        album={album}
                    /> 
                    : null}
                {mediaList !== undefined && showMediaEditModal ?
                    <MediaInfoModal
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
    const { update } = useMedia();

    const handleSave = async () => {

        setIsLoading(true);
        for (let m of mediaList){
            await update({ ID: m.id, albumOrder: mediaList.indexOf(m)});
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
