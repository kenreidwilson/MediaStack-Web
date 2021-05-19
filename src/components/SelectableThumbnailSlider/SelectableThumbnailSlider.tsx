import React from 'react';
import $ from 'jquery'
import SelectableThumbnails from '../SelectableThumbnails/SelectableThumbnails';
import './SelectableThumbnailSlider.css'
import Media from '../../model/Media';

type Props = {
    onThumbnailClick: Function,
    mediaList: Media[],
    mediaNumber: number
}

export default function SelectableThumbnailSlider({mediaList, mediaNumber, onThumbnailClick}: Props) {

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
            <a href="/#" id="thumbnailslider-nav-next" onClick={scroll.bind(null,-1)}>&#10094;&#10094;&#10094;</a>
            <div id="thumbnailslider-image-container">
                <SelectableThumbnails 
                    mediaNumber={mediaNumber}
                    onThumbnailClick={onThumbnailClick}
                    mediaList={mediaList}
                />
            </div>
            <a href="/#" id="thumbnailslider-nav-prev" onClick={scroll.bind(null,1)}>&#10095;&#10095;&#10095;</a>
        </div>
    );
}