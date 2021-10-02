import { useEffect, useState, useRef } from 'react';
import { Spinner } from 'react-bootstrap';
import SelectableThumbnailSlider from '../../components/SelectableThumbnailSlider/SelectableThumbnailSlider';
import Media from '../../model/Media';
import MediaContainer from '../Media/MediaContainer';
import SelectableThumbnails from '../SelectableThumbnails/SelectableThumbnails';

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

    const handleMediaClick = (event: JQuery.ClickEvent) => {
        if (event === undefined || mediaList.length === 1) {
            return;
        }

        let index = mediaList.indexOf(presentedMediaRef.current);
        if (event!.originalEvent!.x - event.target.offsetLeft >= event.target.width / 2) {
            index = index == mediaList.length - 1 ? 0 : index + 1;
        } else {
            index = index == 0 ? mediaList.length - 1 : index - 1;
        }

        onPresentedMediaChange(mediaList[index]);
    }

    return (
        <div id="mediapage-content">
        {mediaList !== undefined && mediaList.length > 0 ? 
            <div>
                {isMediaLoading ? <Spinner id="imageLoadingSpinner" animation="border" variant="primary" /> : null}
                <MediaContainer onLoad={() => setIsMediaLoading(false)} 
                    onClick={(event: JQuery.ClickEvent) => handleMediaClick(event)} media={presentedMedia}/>
            </div>
        : null}
        {mediaList !== undefined ? 
        (global.matchMedia(`(min-width: 768px)`).matches ?
            <SelectableThumbnailSlider mediaList={mediaList} selectedMedia={presentedMedia} onSelectMedia={onPresentedMediaChange}/>
            : 
            <div id="thumbnails">
                <SelectableThumbnails 
                    mediaList={mediaList} 
                    selectedMedia={[presentedMedia]} 
                    onChange={(selectedMedia: Media[]) => selectedMedia.length > 0 ? onPresentedMediaChange(selectedMedia[0]) : () => {}} />
            </div>
        ) 
        : null}
        </div>
    );
}
