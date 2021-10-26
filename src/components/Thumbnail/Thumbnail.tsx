import Media from '../../types/Media';
import { CSSProperties } from 'react';
import useMediaFiles from '../../hooks/useMediaFiles';

type Props = {
    media: Media,
    onClick?: (event: React.MouseEvent, media: Media) => void,
    style?: CSSProperties
}

export default function Thumbnail({ media, onClick = () => {}, style }: Props) {

    const { getThumbnailLink } = useMediaFiles();

    const getAlt = () => {
        let alt: string = '';
        media.tags.forEach(tag => alt += `${tag.name} `);
        return alt;
    }

    return (
        <img 
            style={{ width: 241, height: 155, borderRadius: '8px', ...style }}
            alt={getAlt()}
            src={getThumbnailLink(media)}
            onClick={(event) => onClick(event, media)}>
        </img>
    );
}
