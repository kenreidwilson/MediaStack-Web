import React from 'react';
import Media from '../../model/Media';
import MediaThumbnail from '../MediaThumbnail/MediaThumbnail';
import './SelectableThumbnails.css'

type Props = {
    onThumbnailClick: Function,
    mediaList: Media[],
    mediaNumber: number
}

const SelectableThumbnails = ({mediaList, onThumbnailClick, mediaNumber}: Props) => {

    return ( 
        <div>
            {mediaList.map((media, index) => 
                <a key={index} onClick={() => onThumbnailClick(mediaList.indexOf(media))}>
                    <div className={index === mediaNumber ? "selected-thumbnail" : ""}>
                        <MediaThumbnail media={media}/>
                    </div>
                </a>
            )}
        </div>
     );
}

export default SelectableThumbnails;
