import { useEffect, useState, useRef } from 'react';
import { Spinner } from 'react-bootstrap';
import Media from '../types/Media';
import MediaContainer from './Media/MediaContainer';
import MediaThumbnails from './Thumbnail/MediaThumbnails';
import SelectableThumbnailSlider from './Thumbnail/SelectableThumbnailSlider';

type Props = {
    mediaList: Media[],
    presentedMedia: Media,
    onPresentedMediaChange: (selectedMedia: Media) => void;
}

export default function MediaGallery({ mediaList, presentedMedia, onPresentedMediaChange }: Props) {

    const [isMediaLoading, setIsMediaLoading] = useState<boolean>(true);
    const presentedMediaRef = useRef<Media>(presentedMedia);

    useEffect(() => {
        setIsMediaLoading(true);
        presentedMediaRef.current = presentedMedia;
    }, [presentedMedia]);

    const handleMediaClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if (event === undefined || mediaList.length === 1) {
            return;
        }
        
        let index = mediaList.indexOf(presentedMediaRef.current);
        if (event.pageX - event.currentTarget.offsetLeft >= event.currentTarget.width / 2) {
            index = index === mediaList.length - 1 ? 0 : index + 1;
        } else {
            index = index === 0 ? mediaList.length - 1 : index - 1;
        }

        onPresentedMediaChange(mediaList[index]);
    }

    return (
        <div id='mediapage-content'>
        {mediaList !== undefined && mediaList.length > 0 ? 
            <div>
                {isMediaLoading ? <Spinner id='imageLoadingSpinner' animation='border' variant='primary' /> : null}
                <MediaContainer onLoad={() => setIsMediaLoading(false)} 
                    onClick={(event: React.MouseEvent<HTMLImageElement, MouseEvent>) => handleMediaClick(event)} media={presentedMedia}/>
            </div>
        : null}
        {mediaList !== undefined ? 
        (global.matchMedia(`(min-width: 768px)`).matches ?
            <SelectableThumbnailSlider mediaList={mediaList} selectedMedia={presentedMedia} onSelectMedia={onPresentedMediaChange}/>
            : 
            <div id='thumbnails'>
                <MediaThumbnails 
                    canUnselect={false}
                    mediaList={mediaList} 
                    selectedMedia={[presentedMedia]} 
                    onSelectionChange={(sm: Media[]) => onPresentedMediaChange(sm.filter(m => m !== presentedMedia)[0])} />
            </div>
        ) 
        : null}
        </div>
    );
}
