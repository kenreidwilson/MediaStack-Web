import Media from '../../types/Media';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import DistinguishedThumbnail from './DistinguishedThumbnail';

type Props = {
    mediaList: Media[],
    distinguishAlbumMedia?: boolean,
    selectedMedia?: Media[],
    onSelectionChange?: (selectedMedia: Media[]) => void;
    canUnselect?: boolean
}

export default function SelectableThumbnails({ 
    mediaList, 
    distinguishAlbumMedia = false, 
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
          {mediaList && mediaList.map(media => 
                <div key={media.id}>
                    <DistinguishedThumbnail 
                        media={media}
                        onClick={(_, m) => onMediaSelected(m)}
                        distinguishAlbum={!isNaN(media.albumID!) && distinguishAlbumMedia}
                        style={
                            selectedMedia && isMediaSelected(media) ? 
                            { margin: '2px', border: `3px solid ${theme.style.primaryColor}`, padding: '3px' } : 
                            { margin: '2px' }}/>
                </div>
            )}  
        </>
    );
}
