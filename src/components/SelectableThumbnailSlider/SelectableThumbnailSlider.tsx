import $ from 'jquery'
import './SelectableThumbnailSlider.css'
import Media from '../../model/Media';
import SelectableThumbnails from '../SelectableThumbnails/SelectableThumbnails';

type Props = {
    mediaList: Media[],
    selectedMedia: Media,
    onSelectMedia: (selectedMedia: Media) => void;
}

export default function SelectableThumbnailSlider({mediaList, selectedMedia, onSelectMedia}: Props) {

    const scroll = (direction: number) => {
        let element: JQuery<HTMLElement>
        element = $('#thumbnailslider-image-container');
        if (element !== undefined) {
            let far = element.width()! / 2 * direction;
            let pos = element.scrollLeft()! + far;
            element.animate( { scrollLeft: pos }, 1000)
        }
    }

    return (
        <div id="thumbnail-slider">
            <a id="thumbnailslider-nav-next" onClick={scroll.bind(null,-1)}>&#10094;&#10094;&#10094;</a>
            <div id="thumbnailslider-image-container">
                <SelectableThumbnails 
                    canUnselect={false}
                    mediaList={mediaList}
                    selectedMedia={[selectedMedia]}
                    onChange={(sm: Media[]) => onSelectMedia(sm.filter(m => m !== selectedMedia)[0])}
                />
            </div>
            <a id="thumbnailslider-nav-prev" onClick={scroll.bind(null,1)}>&#10095;&#10095;&#10095;</a>
        </div>
    );
}
