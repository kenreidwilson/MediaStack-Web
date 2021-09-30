import { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import Media from '../../../model/Media';
import MediaThumbnails from '../../MediaThumbnails/MediaThumbnails';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IMediaSearchQuery, MediaRepository } from '../../../repositories/MediaRepository';

type Props = {
    baseQuery: IMediaSearchQuery,
    linkToAlbums: boolean
};

export default function AutoPagedThumbnails({baseQuery, linkToAlbums}: Props) {

    const [maxMediaCount, setMaxMediaCount] = useState<number | undefined>();
    const [mediaList, setMediaList] = useState<Media[]>([]);

    useEffect(() => {
        loadMoreMedia();
    }, []);

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
            let finalQuery = baseQuery;
            finalQuery.offset = mediaList.length;
            finalQuery.count = getMediaBatchSize();
            await new MediaRepository().search(finalQuery).then(response => {
                setMediaList([...mediaList, ...response.media]);
                setMaxMediaCount(response.total);
            });
        }
    }

    return (
        <div>
            <InfiniteScroll
                scrollableTarget="scrollableDiv"
                dataLength={mediaList.length}
                next={() => loadMoreMedia()}
                hasMore={canLoadMore()}
                loader={<Spinner style={{position: 'absolute'}} animation="border" variant="primary"/>}
            >
                <MediaThumbnails mediaList={mediaList} linkToAlbums={linkToAlbums}/>
            </InfiniteScroll>
        </div>
    );
}