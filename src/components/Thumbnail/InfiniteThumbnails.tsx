import Media from '../../types/Media';
import IMediaSearchQuery from '../../types/IMediaSearchQuery';
import { useState, useEffect, CSSProperties } from 'react';
import useMedia from '../../hooks/useMedia';
import { Spinner } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import MediaThumbnails from './MediaThumbnails';

type Props = {
    mediaQuery: IMediaSearchQuery,
    mediaList: Media[],
    setMediaList: (mediaList: Media[]) => void,
    onThumbnailClick?: (event: React.MouseEvent, media: Media) => void,
    onMediaLoad?: (mediaCount: number) => void,
    distinguishAlbumMedia?: boolean,
    thumbnailContainerStyle?: CSSProperties
};

export default function InfiniteThumbnails({ 
    mediaQuery,  
    mediaList,
    setMediaList,
    onThumbnailClick = () => {}, 
    onMediaLoad = () => {},
    distinguishAlbumMedia = false,
    thumbnailContainerStyle }: Props) {

    const [maxMediaCount, setMaxMediaCount] = useState<number | undefined>();

    const { search } = useMedia();

    useEffect(() => {
        loadMoreMedia();
    }, []);

    useEffect(() => {
        onMediaLoad(mediaList.length);
    }, [mediaList])

    const canLoadMore = () => maxMediaCount === undefined || mediaList.length < maxMediaCount;

    /*** Returns an estimation on how many media should be queried for. 
     * 
     * Infinite scrolling does not load more unless a page can be scrolled.
     * This estimates how many media will make the page scrollable.
     * TODO: Find a better way.
    */
    const getMediaBatchSize = () => {
        let mobileScreenWidthThreshold = 768;
        let mobileThumbnailSize = 171 * 100;
        let desktopThumbnailSize = 241 * 155;

        let thumbnailSize = window.innerWidth < mobileScreenWidthThreshold ? mobileThumbnailSize : desktopThumbnailSize;
        return Math.round((window.innerHeight * window.innerWidth) / thumbnailSize);
    }

    const loadMoreMedia = async () => {
        if (canLoadMore()) {
            let finalQuery = mediaQuery;
            finalQuery.offset = mediaList.length;
            finalQuery.count = getMediaBatchSize();
            await search(finalQuery).then(response => {
                setMediaList([...mediaList, ...response.data]);
                setMaxMediaCount(response.total);
            });
        }
    }

    return (
        <>
            <InfiniteScroll
                scrollableTarget='scrollableDiv'
                dataLength={mediaList.length}
                next={() => loadMoreMedia()}
                hasMore={canLoadMore()}
                loader={<Spinner style={{position: 'absolute'}} animation='border' variant='primary'/>}
            >
                <div style={thumbnailContainerStyle}>
                    <MediaThumbnails mediaList={mediaList} onClick={onThumbnailClick} distinguishAlbumMedia={distinguishAlbumMedia}/>
                </div>
            </InfiniteScroll>
        </>
    );
}
