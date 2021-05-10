import React from 'react';
import Media from '../../model/Media';
import './MediaThumbnail.css'

type Props = {
    media: Media
}

const MediaThumbnail = ({media}: Props) => (
    <img 
        className={"thumbnail"}
        src={`${process.env.REACT_APP_API}/media/${media.id}/thumbnail`}>
    </img>
)

export default MediaThumbnail;