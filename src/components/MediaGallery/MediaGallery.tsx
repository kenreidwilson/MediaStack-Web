import React, { useState, useRef } from 'react';
import { Spinner } from 'react-bootstrap';
import SelectableThumbnails from '../../components/SelectableThumbnails/SelectableThumbnails';
import SelectableThumbnailSlider from '../../components/SelectableThumbnailSlider/SelectableThumbnailSlider';
import Media from '../../model/Media';
import MediaContainer from '../Media/MediaContainer';

type Props = {
    mediaList: Media[],
    onMediaSelect?: Function
}

export default function MediaGallery({ mediaList, onMediaSelect }: Props) {

    const [mediaIndex, setMediaIndex] = useState<number>(0);
    const [isMediaLoading, setIsMediaLoading] = useState<boolean>(true);

    const mediaIndexRef = useRef(-1);
    mediaIndexRef.current = mediaIndex;

    const handleThumbnailClick = (index: number) => {
        if (mediaIndex === index) {
            return;
        }
        setMediaIndex(index);

        if (onMediaSelect !== undefined) {
            onMediaSelect(index);
        }

        setIsMediaLoading(true);
    }

    const handleMediaClick = (event: JQuery.ClickEvent) => {
        if (event === undefined || mediaList.length === 1) {
            return;
        }

        let index = -1;
        if (event!.originalEvent!.x - event.target.offsetLeft >= event.target.width / 2) {
            index = mediaIndexRef.current === mediaList.length - 1 ? 0 : mediaIndexRef.current + 1;
        } else {
            index = mediaIndexRef.current === 0 ? mediaList.length - 1 : mediaIndexRef.current - 1;
            
        }
        setMediaIndex(index);
        if (onMediaSelect !== undefined) {
            onMediaSelect(index);
        }
        setIsMediaLoading(true);
    }

    return (
        <div id="mediapage-content">
        {mediaList !== undefined && mediaList.length > 0 ? 
            <div>
                {isMediaLoading ? <Spinner id="imageLoadingSpinner" animation="border" variant="primary" /> : null}
                <MediaContainer onLoad={() => setIsMediaLoading(false)} 
                    onClick={(event: JQuery.ClickEvent) => handleMediaClick(event)} media={mediaList[mediaIndex]}/>
            </div>
        : null}
        {mediaList !== undefined ? 
        (global.matchMedia(`(min-width: 768px)`).matches ?
            <SelectableThumbnailSlider mediaNumber={mediaIndex} onThumbnailClick={handleThumbnailClick} mediaList={mediaList}/>
            : 
            <div id="thumbnails">
                <SelectableThumbnails mediaNumber={mediaIndex} onThumbnailClick={handleThumbnailClick} mediaList={mediaList}/>
            </div>
        ) 
        : null}
        </div>
    );
}
