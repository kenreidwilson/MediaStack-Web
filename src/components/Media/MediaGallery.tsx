import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Spinner } from 'react-bootstrap';
import Media from '../../types/Media';
import MediaContainer from './MediaContainer';
import SelectableThumbnails from '../Thumbnail/SelectableThumbnails';
import SelectableThumbnailSlider from '../Thumbnail/SelectableThumbnailSlider';
import MediaPreview from '../Media/MediaPreview';

type Props = {
    mediaList: Media[],
    presentedMedia: Media,
    setPresentedMedia: (selectedMedia: Media) => void;
}

export default function MediaGallery({ mediaList, presentedMedia, setPresentedMedia }: Props) {

    const [isMediaLoading, setIsMediaLoading] = useState<boolean>(true);
    const [showPreview, setShowPreview] = useState<boolean>(false);

    const previewMediaIndex = useRef<number | null>(null);

    useEffect(() => {
        setIsMediaLoading(true);
        previewMediaIndex.current = mediaList.indexOf(presentedMedia);
    }, [presentedMedia]);

    const next = (mediaList: Media[], selectedMedia: Media) => {
        if (previewMediaIndex.current !== null) {
            previewMediaIndex.current = previewMediaIndex.current === mediaList.length - 1 ? 0 : previewMediaIndex.current + 1;
            setPresentedMedia(mediaList[previewMediaIndex.current]);
        }
        return Promise.resolve();
    }

    const previous = (mediaList: Media[], selectedMedia: Media) => {
        if (previewMediaIndex.current !== null) {
            previewMediaIndex.current = previewMediaIndex.current === 0 ? mediaList.length - 1 : previewMediaIndex.current - 1;
            setPresentedMedia(mediaList[previewMediaIndex.current]);
        }
        return Promise.resolve();
    }

    const mediaClickEventHandler = useCallback(
        (event: React.MouseEvent<HTMLImageElement> | React.MouseEvent<HTMLVideoElement>) => {
            if (event === undefined || mediaList.length === 1) {
                return;
            }
            
            if (event.pageX - event.currentTarget.offsetLeft >= event.currentTarget.width * 0.75) {
                next(mediaList, presentedMedia);
            } else if (event.pageX - event.currentTarget.offsetLeft < event.currentTarget.width * 0.25) {
                previous(mediaList, presentedMedia);
            } else {
                setShowPreview(true);
            }
    
        }, [presentedMedia]);

    return (
        <div>
            {showPreview && presentedMedia && 
                <MediaPreview 
                    show={showPreview} 
                    media={presentedMedia}
                    onClose={() => setShowPreview(false)}
                    onNext={() => previous(mediaList, presentedMedia)}
                    onPrevious={() => next(mediaList, presentedMedia)}/>}
            {mediaList !== undefined && mediaList.length > 0 ? 
                <div>
                    {isMediaLoading ? <Spinner style={{ width: '75px', height: '75px', position: 'absolute', margin: '17.5% 42.5%' }} animation='border' variant='primary' /> : null}
                    {!showPreview && <MediaContainer onLoad={() => setIsMediaLoading(false)} onClick={mediaClickEventHandler} media={presentedMedia}/>}
                </div>
            : null}
            {mediaList !== undefined ? 
            (global.matchMedia(`(min-width: 768px)`).matches ?
                <SelectableThumbnailSlider mediaList={mediaList} selectedMedia={presentedMedia} onSelectMedia={setPresentedMedia}/>
                : 
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <SelectableThumbnails 
                        canUnselect={false}
                        mediaList={mediaList} 
                        selectedMedia={[presentedMedia]} 
                        onSelectionChange={(sm: Media[]) => setPresentedMedia(sm.filter(m => m !== presentedMedia)[0])} />
                </div>
            ) 
            : null}
        </div>
    );
}
