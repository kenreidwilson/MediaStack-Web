import { CSSProperties } from 'react';
import Media from '../types/Media';

type Props = {
    media: Media,
    onClick?: (event: React.MouseEvent, media: Media) => void,
    style?: CSSProperties
}

export default function MediaThumbnail({ media, onClick = () => {}, style }: Props) {

    const getAlt = () => {
        let alt: string = "";
        media.tags.forEach(tag => alt += `${tag.name} `);
        return alt;
    }

    return (
        <img 
            style={{ width: 241, height: 155, borderRadius: "8px", ...style }}
            alt={getAlt()}
            src={`${process.env.REACT_APP_API}/media/thumbnail?id=${media.id}`}
            onClick={(event) => onClick(event, media)}>
        </img>
    );
}
