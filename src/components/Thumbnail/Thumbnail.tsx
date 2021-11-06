import Media from '../../types/Media';
import { CSSProperties, useMemo } from 'react';
import useMediaFiles from '../../hooks/useMediaFiles';
import usePlatform from '../../hooks/usePlatform';

type Props = {
    media: Media,
    onClick?: (event: React.MouseEvent, media: Media) => void,
    style?: CSSProperties,
    thumbnailRef?: React.LegacyRef<HTMLImageElement>
}

export default function Thumbnail({ media, onClick = () => {}, style, thumbnailRef }: Props) {

    const baseWidth = 241;
    const baseHeight = 155;

    const { getThumbnailLink } = useMediaFiles();
    const { isMobile } = usePlatform();
    
    const MediaAlt = useMemo(() => {
        let alt: string = '';
        media.tags.forEach(tag => alt += `${tag.name} `);
        return alt;
    }, [media]);

    return (
        <img 
            ref={thumbnailRef}
            style={{ width: isMobile ? 175 : baseWidth , height: isMobile ? 112 : baseHeight, borderRadius: '8px', ...style }}
            alt={MediaAlt}
            src={getThumbnailLink(media)}
            onClick={(event) => onClick(event, media)}>
        </img>
    );
}
