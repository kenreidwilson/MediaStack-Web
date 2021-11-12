import Media from '../../types/Media';
import React, { CSSProperties, useMemo, useCallback } from 'react';
import useMediaFiles from '../../hooks/useMediaFiles';
import usePlatform from '../../hooks/usePlatform';

type Props = {
    media: Media,
    onClick?: (event: React.MouseEvent, media: Media) => void,
    onMiddleClick?: (event: React.MouseEvent, media: Media) => void,
    style?: CSSProperties,
    thumbnailRef?: React.MutableRefObject<HTMLImageElement | undefined>
}

export default function Thumbnail({ 
    media, 
    onClick = () => {}, 
    onMiddleClick = () => {},
    style, 
    thumbnailRef }: Props) {

    const baseWidth = 241;
    const baseHeight = 155;

    const { getThumbnailLink } = useMediaFiles();
    const { isMobile } = usePlatform();

    const mediaAlt = useMemo(() => {
        let alt: string = '';
        media.tags.forEach(tag => alt += `${tag.name} `);
        return alt;
    }, [media]);

    const isMiddleClick = useCallback((event: React.MouseEvent): boolean => {
        return event.button === 1;
    }, []);

    return (
        <img
            ref={thumbnailRef as React.LegacyRef<HTMLImageElement>}
            style={{ width: isMobile ? 175 : baseWidth , height: isMobile ? 112 : baseHeight, borderRadius: '8px', ...style }}
            alt={mediaAlt}
            src={getThumbnailLink(media)}
            onClick={(event) => onClick(event, media)}
            onMouseDown={(e) => isMiddleClick(e) && onMiddleClick(e, media)}/>
    );
}
