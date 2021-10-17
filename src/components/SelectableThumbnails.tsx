import Media from '../types/Media';
import MediaThumbnail from './MediaThumbnail';
import './SelectableThumbnails.css'

type Props = {
    mediaList: Media[],
    selectedMedia: Media[],
    onChange: (selectedMedia: Media[]) => void;
    canUnselect?: boolean
}

const SelectableThumbnails = ({mediaList, selectedMedia, onChange, canUnselect = true}: Props) => {

    const isMediaEqual = (media: Media, other: Media) => {
        return media == other;
    }

    const isMediaSelected = (media: Media) => {
        return selectedMedia.find(m => isMediaEqual(m, media)) !== undefined;
    }

    const onMediaSelected = (media: Media) => {
        if (isMediaSelected(media)) {
            if (canUnselect) {
                onChange(selectedMedia.filter(m => !isMediaEqual(media, m)));
            }
        }
        else {
            onChange([...selectedMedia, media]);
        }
    }

    return ( 
        <>
            {mediaList.map((media) => 
                <a key={media.id} onClick={() => onMediaSelected(media)}>
                    <div className={isMediaSelected(media) ? "selected-thumbnail" : ""}>
                        <MediaThumbnail media={media}/>
                    </div>
                </a>
            )}
        </>
     );
}

export default SelectableThumbnails;