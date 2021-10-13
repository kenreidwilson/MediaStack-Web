import './SelectableThumbnailSlider.css'
import Media from '../types/Media';
import SelectableThumbnails from './SelectableThumbnails';

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
                <SelectableThumbnails 
                    canUnselect={false}
                    mediaList={mediaList}
                    selectedMedia={[selectedMedia]}
                    onChange={(sm: Media[]) => onSelectMedia(sm.filter(m => m !== selectedMedia)[0])}
                />
            </div>
            <a id="thumbnailslider-nav-prev" onClick={() => {}}>&#10095;&#10095;&#10095;</a>
        </div>
    );
}
