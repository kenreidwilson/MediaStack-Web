import Media from '../../types/Media';
import DistinguishedThumbnail from './DistinguishedThumbnail';

type Props = {
    mediaList: Media[]
    distinguishAlbumMedia?: boolean,
    onClick?: (event: React.MouseEvent, media: Media) => void,
    onMiddleClick?: (event: React.MouseEvent, media: Media) => void,
}

export default function Thumbnails({ mediaList, distinguishAlbumMedia = false, onClick, onMiddleClick }: Props) {

    return ( 
        <>
          {mediaList && mediaList.map(media => 
                <DistinguishedThumbnail key={media.id}
                    style={{ margin: '2px' }}
                    media={media}
                    onClick={onClick}
                    onMiddleClick={onMiddleClick}
                    distinguishAlbum={media.albumID !== undefined && media.albumID !== null && distinguishAlbumMedia} />
            )}  
        </>
    );
}
