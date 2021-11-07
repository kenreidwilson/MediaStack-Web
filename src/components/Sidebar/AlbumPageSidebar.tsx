import Media from '../../types/Media';
import Album from '../../types/Album';
import { Button } from 'react-bootstrap';
import MediaInfoSidebar from './MediaInfoSidebar';
import AlbumInfoSidebar from './AlbumInfoSidebar';

type Props = {
    album: Album,
    mediaList: Media[],
    selectedMedia: Media,
    onEditMedia?: () => void,
    onEditAlbum?: () => void,
    onEditAlbumMedia?: () => void,
    onOrganizeAlbumMedia?: () => void
}

export default function AlbumPageSidebar({ 
    album, 
    mediaList, 
    selectedMedia,
    onEditMedia, 
    onEditAlbum, 
    onEditAlbumMedia,
    onOrganizeAlbumMedia }: Props) {

    return(
        <div style={{ width: '100%'}}>
            <Button onClick={onEditMedia}>Edit Media</Button>
            {mediaList.length > 0 ? <MediaInfoSidebar media={selectedMedia}/> : null }
            <Button onClick={onEditAlbum}>Edit Album</Button>
            <AlbumInfoSidebar album={album} mediaList={mediaList} />
            <div>
                <Button onClick={onEditAlbumMedia}>Edit Album Media</Button>
                <Button onClick={onOrganizeAlbumMedia}>Organize</Button>
            </div>
        </div>
    );
}
