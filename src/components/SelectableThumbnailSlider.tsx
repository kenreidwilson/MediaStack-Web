import './SelectableThumbnailSlider.css'
import Media from '../types/Media';
import MediaThumbnails from './MediaThumbnails';

type Props = {
    mediaList: Media[],
    selectedMedia: Media,
    onSelectMedia: (selectedMedia: Media) => void;
}

export default function SelectableThumbnailSlider({mediaList, selectedMedia, onSelectMedia}: Props) {

    return (
        <div id="thumbnail-slider">
            <a id="thumbnailslider-nav-next" onClick={() => {}}>&#10094;&#10094;&#10094;</a>
            <div id="thumbnailslider-image-container">
                <MediaThumbnails 
                    mediaList={mediaList}
                    selectedMedia={[selectedMedia]}                    
                    onSelectionChange={(sm: Media[]) => onSelectMedia(sm.filter(m => m !== selectedMedia)[0])}
                    canUnselect={false}
                />
            </div>
            <a id="thumbnailslider-nav-prev" onClick={() => {}}>&#10095;&#10095;&#10095;</a>
        </div>
    );
}
