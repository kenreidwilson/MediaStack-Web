import Media from '../types/Media';
import MediaThumbnail from './MediaThumbnail';
import './MediaThumbnails.css';

type Props = {
    linkToAlbums: boolean,
    mediaList: Media[]
}

const MediaThumbnails = ({linkToAlbums, mediaList}: Props) => {
    return ( 
        <div id="thumbnails">
            {mediaList.map(media => 
                <a href={linkToAlbums && media.albumID !== null ? `/album?id=${media.albumID}` : `/media?id=${media.id}`}>
                    <div className="thumbnail_container">
                        {linkToAlbums && media.albumID !== null ? 
                        <span id="album_id_badge" className="badge badge-primary">Album</span> 
                        : null}
                        <MediaThumbnail key={media.id} media={media}/>
                    </div>
                </a>
            )}
        </div>
    );
}

export default MediaThumbnails;