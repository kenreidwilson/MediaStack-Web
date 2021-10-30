import Media from '../types/Media';
import Album from '../types/Album';
import { useState, useEffect, useContext } from 'react';
import { ErrorContext } from '../contexts/ErrorContext';
import useAlbums from '../hooks/useAlbums';
import useMedia from '../hooks/useMedia';
import useNavigation from '../hooks/useNavigation';
import { Button } from 'react-bootstrap';
import BasePage from './BasePage';
import MediaGallery from '../components/Media/MediaGallery';
import DraggableThumbnails from '../components/Thumbnail/DraggableThumbnails';
import MediaInfoSidebar from '../components/Sidebar/MediaInfoSidebar';
import AlbumInfoSidebar from '../components/Sidebar/AlbumInfoSidebar';
import AlbumEditModal from '../components/Modals/AlbumEditModal';
import MediaInfoModal from '../components/Modals/MediaEditModal';
import MediaListUpdate from '../components/Media/MediaListUpdate';

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
            //setAlerts([...alerts, <MSBannerAlert variant='danger' heading='API Error:' body={error.message}/>]);
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
        setIsOrganizeMode(io => !io);
    }

    return (
        <BasePage>
            <div>
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
                <div style={{ display: 'flex' }}>
                    <div style={{ width: '230px' }} >
                        {mediaList !== undefined && selectedMedia !== undefined ? 
                            <div>
                                <Button onClick={() => setShowMediaEditModal(true)}>Edit Media</Button>
                                {mediaList.length > 0 ? <MediaInfoSidebar media={selectedMedia} setMedia={updateSelectedMedia}/> : null }
                                <Button onClick={() => setShowAlbumEditModal(true)}>Edit Album</Button>
                                <AlbumInfoSidebar album={album!} setAlbum={setAlbum} mediaList={mediaList}updateMediaList={updateMediaList}/>
                                <Button onClick={toggleOrganize}>Organize</Button>
                            </div> : null}
                    </div>
                    <div>
                        {selectedMedia !== undefined ? 
                            isOrganizeMode ? 
                                <MediaListUpdate 
                                    mediaList={mediaList} 
                                    setMediaList={(mediaList) => { setMediaList(mediaList); toggleOrganize() }}
                                    onCancel={() => toggleOrganize()}/> : 
                                <MediaGallery mediaList={mediaList} presentedMedia={selectedMedia} setPresentedMedia={setSelectdMedia}/> 
                        : null}
                    </div>
                </div>
                
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

    const { addError } = useContext(ErrorContext);

    const handleSave = async () => {

        setIsLoading(true);
        for (let m of mediaList){
            try {
                await update({ ID: m.id, albumOrder: mediaList.indexOf(m)});
                setIsLoading(false);
                onSave();
            } catch (e) {
                addError(e as Error);
            }
        }   
    }

    return (
            <div>
                <DraggableThumbnails mediaList={mediaList} onReorder={setMediaList}/>
                <button className='btn btn-primary' disabled={isLoading} onClick={handleSave}>Save</button>
            </div>
        );
}
