import Media from '../types/Media';
import './MediaThumbnail.css'

type Props = {
    media: Media
}

export default function MediaThumbnail({media}: Props) {

    const getAlt = () => {
        let alt: string = "";
        media.tags.forEach(tag => alt += `${tag.name} `);
        return alt;
    }

    return (
        <img 
            alt={getAlt()}
            className={"thumbnail"}
            src={`${process.env.REACT_APP_API}/media/thumbnail?id=${media.id}`}>
        </img>
    );
}
