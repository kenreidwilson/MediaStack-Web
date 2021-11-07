import Media from '../../types/Media';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import usePlatform from '../../hooks/usePlatform';
import { Badge } from 'react-bootstrap';
import Thumbnail from './Thumbnail';

type Props = {
    media: Media,
    distinguishAlbum: boolean,
    onClick?: (event: React.MouseEvent, media: Media) => void,
    style?: CSSProperties
}

export default function DistinguishedThumbnail({ media, onClick, style, distinguishAlbum = false }: Props) {

    const { isMobile } = usePlatform();
    const thumbnailRef = useRef<HTMLImageElement>();

    const [size, setSize] = useState<{ width: number, height: number }>({ width: 0, height: 0 });

    useEffect(() => {
        if (thumbnailRef.current !== undefined) {
            setSize({ height: thumbnailRef.current.height, width: thumbnailRef.current.width })
        }
    }, [isMobile]);

    return (
        <div>
            {distinguishAlbum && 
                <Badge style={{ margin: `${size.height - 25}px 0px 0px ${size.width - 60}px`, position: 'absolute' }} bg="primary">Album</Badge>}
            <Thumbnail 
                media={media} 
                onClick={onClick} 
                style={style}
                thumbnailRef={thumbnailRef} />
        </div>
    );
}
