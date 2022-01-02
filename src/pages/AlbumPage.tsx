import { Album, Media } from '../types';
import { useState, useEffect } from 'react';
import useAlbums from '../hooks/useAlbums';
import useMedia from '../hooks/useMedia';
import useNavigation from '../hooks/useNavigation';
import usePlatform from '../hooks/usePlatform';
import BasePage from './BasePage';
import MediaGallery from '../components/Media/MediaGallery';
import AlbumEditModal from '../components/Modals/AlbumEditModal';
import MediaInfoModal from '../components/Modals/MediaEditModal';
import MediaListUpdate from '../components/Media/MediaListUpdate';
import AlbumPageSidebar from '../components/Sidebar/AlbumPageSidebar';
import OrganizeAlbumMedia from '../components/Media/OrganizeAlbumMedia';

type PageMode = 'default' | 'edit' | 'organize';

export default function AlbumPage() {
    // TODO: use useReduer.
    const [album, setAlbum] = useState<Album>();
    const [mediaList, setMediaList] = useState<Media[]>([]);
    const [selectedMedia, setSelectdMedia] = useState<Media | undefined>(undefined);
    const [showMediaEditModal, setShowMediaEditModal] = useState<boolean>(false);
    const [showAlbumEditModal, setShowAlbumEditModal] = useState<boolean>(false);
    const [pageMode, setPageMode] = useState<PageMode>('default');
    
    const { get: getAlbum } = useAlbums();
    const { search: searchMedia } = useMedia();

    const { getNavigationData } = useNavigation();

    const { isMobile } = usePlatform();

    useEffect(() => {
        let albumID = +getNavigationData()['id'];
        getAlbum(albumID).then(album => {
            setAlbum(album);
            refreshMediaList(album);
        }).catch(error => { 
            //setAlerts([...alerts, <MSBannerAlert variant='danger' heading='API Error:' body={error.message}/>]);
        });
        
    }, []);

    const refreshMediaList = async (album: Album) => {

        if (album === undefined) {
            return;
        }

        let albumMedia: Media[] = (await searchMedia({ albumID: album!.id, mode: 1, count: 999 })).data;
        albumMedia = albumMedia.sort((a: Media, b: Media) => (a.albumOrder > b.albumOrder) ? 1 : -1);
        setMediaList(albumMedia);
        setSelectdMedia(psm => psm ? albumMedia.find(m => m.id === psm.id) : albumMedia[0]);
    }

    const Body = (): JSX.Element | null => {

        if (!selectedMedia) {
            return null;
        }

        switch(pageMode) {
            case 'organize':
                return (
                    <OrganizeAlbumMedia 
                        initialMediaList={mediaList} 
                        onSave={(mediaList) => { setMediaList(mediaList); setPageMode('default'); }}
                        onCancel={() => setPageMode('default')}/>
                );
            case 'edit':
                return (
                    <MediaListUpdate 
                        mediaList={mediaList} 
                        onSave={(mediaList) => { refreshMediaList(album!); setPageMode('default') }}
                        onCancel={() => setPageMode('default')}
                    />);
            default:
                return (
                    <div style={!isMobile ? { maxHeight: '90vh' } : {}}>
                        <MediaGallery mediaList={mediaList} presentedMedia={selectedMedia} setPresentedMedia={setSelectdMedia}/> 
                    </div>
                    
                );
        }
    }

    return (
        <BasePage>
            <div>
                {album && showAlbumEditModal && 
                    <AlbumEditModal 
                        isShown={showAlbumEditModal} 
                        onClose={() => setShowAlbumEditModal(false)}
                        onSave={(album: Album) => { setAlbum(album); refreshMediaList(album); setShowAlbumEditModal(false); }}
                        mediaList={mediaList}
                        album={album}
                    />}
                {album && mediaList && showMediaEditModal &&
                    <MediaInfoModal
                        isShown={showMediaEditModal}
                        onSave={() => { refreshMediaList(album); setShowMediaEditModal(false); }}
                        onClose={() => setShowMediaEditModal(false)}
                        media={selectedMedia!}
                    />}

                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row-reverse' }}>
                    <div style={{ width: '100%' }}>
                        {Body()}
                    </div>
                    <div style={{ width: isMobile ? '100%' : '350px' }} >
                        {mediaList && selectedMedia && album && 
                            <AlbumPageSidebar 
                                album={album} 
                                mediaList={mediaList} 
                                selectedMedia={selectedMedia}
                                onEditAlbum={() => setShowAlbumEditModal(true)} 
                                onEditMedia={() => setShowMediaEditModal(true)} 
                                onEditAlbumMedia={() => setPageMode(pm => pm === 'edit' ? 'default' : 'edit')}
                                onOrganizeAlbumMedia={() => setPageMode(pm => pm === 'organize' ? 'default' : 'organize')}
                            />}
                    </div>
                </div>
            </div>
        </BasePage>
     );
}
