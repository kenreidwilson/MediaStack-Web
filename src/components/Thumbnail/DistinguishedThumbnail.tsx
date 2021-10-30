import Media from '../../types/Media';
import { CSSProperties } from 'react';
import { Badge } from 'react-bootstrap';
import Thumbnail from './Thumbnail';

type Props = {
    media: Media,
    distinguishAlbum: boolean,
    onClick?: (event: React.MouseEvent, media: Media) => void,
    style?: CSSProperties
}

export default function DistinguishedThumbnail({ media, onClick, style, distinguishAlbum = false }: Props) {

    return (
        <div>
            {distinguishAlbum && 
            <Badge style={{ margin: '130px 0px 0px 185px', position: 'absolute' }} bg="primary">Album</Badge>}
            <Thumbnail media={media} onClick={onClick} style={style}/>
        </div>
    );
}
