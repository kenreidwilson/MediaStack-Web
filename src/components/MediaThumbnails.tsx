import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import Media from '../types/Media';
import MediaThumbnail from './MediaThumbnail';

type Props = {
    mediaList: Media[]
    distinguishAlbumMedia?: boolean,
    onClick?: (event: React.MouseEvent, media: Media) => void,
    selectedMedia?: Media[],
    onSelectionChange?: (selectedMedia: Media[]) => void;
    canUnselect?: boolean
}

export default function MediaThumbnails({ 
    mediaList, 
    distinguishAlbumMedia = false, 
    onClick = () => {},
    selectedMedia,
    onSelectionChange = () => {},
    canUnselect = true }: Props) {
    
    const { theme } = useContext(ThemeContext);

    const isMediaEqual = (media: Media, other: Media) => {
        return media == other;
    }

    const isMediaSelected = (media: Media) => {
        return selectedMedia && selectedMedia.find(m => isMediaEqual(m, media)) !== undefined;
    }

    const onMediaSelected = (media: Media) => {

        if (!selectedMedia) {
            return;
        }

        if (isMediaSelected(media)) {
            if (canUnselect) {
                onSelectionChange(selectedMedia.filter(m => !isMediaEqual(media, m)));
            }
        }
        else {
            onSelectionChange([...selectedMedia, media]);
        }
    }

    return ( 
        <>
          {mediaList.map(media => 
                <div key={media.id}>
                    {distinguishAlbumMedia && media.albumID !== null && 
                        <span 
                            style={{ margin: "130px 0px 0px 185px", position: "absolute" }} 
                            className="badge badge-primary">Album</span>}
                    <MediaThumbnail 
                            onClick={(e, m) => { onClick(e, m); onMediaSelected(m); }} 
                            media={media}
                            style={
                                selectedMedia && isMediaSelected(media) ? 
                                { margin: "2px", border: `3px solid ${theme.style.primaryColor}`, padding: "3px" } : 
                                { margin: "2px" }}/>
                </div>
            )}  
        </>
    );
}
