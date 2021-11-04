import Media from '../../types/Media';
import IMediaSearchQuery from '../../types/IMediaSearchQuery';
import React, { useCallback, useState } from 'react';
import useNavigation from '../../hooks/useNavigation';
import InfiniteThumbnails from '../Thumbnail/InfiniteThumbnails';
import PaginatedThumbnails from '../Thumbnail/PaginatedThumbnails';
import MediaPreview from '../Media/MediaPreview';

type Props = {
    mediaQuery: IMediaSearchQuery,
    mediaPerPage: number,
    mediaList: Media[],
    setMediaList?: (mediaList: Media[]) => void,
    linkToAlbums?: boolean,
    isInfinite?: boolean
};

export default function PageThumbnails({ 
    mediaQuery, 
    mediaPerPage, 
    mediaList, setMediaList = () => {}, 
    linkToAlbums = mediaQuery.mode === 2, 
    isInfinite = false }: Props) {

    const { navigate, getNavigationData } = useNavigation();
    const navigationData = getNavigationData();
    const pageNumberKey = 'p';

    const getPageNumber = (): number | undefined => {
        return isNaN(+navigationData[pageNumberKey]) ? undefined : +navigationData[pageNumberKey];
    }

    const initialPageNumber = getPageNumber();
    const [pageNumber, setPageNumber] = useState<number>(initialPageNumber ? initialPageNumber : 1);

    const enableInfiniteScrolling = () => {
        setMediaList([]);
        navigate({ name: 'search', data: { ...navigationData, p: -1 }});
    }

    const [ previewState, setPreviewState ] = useState<{ selectedMedia?: Media, show: boolean }>({ show: false });

    const onThumbnailClick = (event: React.MouseEvent, media: Media) => {
        //setPreviewState({ selectedMedia: media, show: true })
        //return;
        if (linkToAlbums && media.albumID) {
            navigate({ name: 'album', data: { id: media.albumID } });
        }
        else {
            navigate({ name: 'media', data: { id: media.id } });
        }
    }

    const previewNextMedia = useCallback(() => {
        if (previewState.selectedMedia) {
            let currentMediaIndex = mediaList.indexOf(previewState.selectedMedia);
            let nextMediaIndex = mediaList.length < currentMediaIndex ? 0 : currentMediaIndex + 1;
            setPreviewState(ps => ({ ...ps, selectedMedia: mediaList[nextMediaIndex] }));
        }
    }, [mediaList, previewState]);

    const previewPreviousMedia = useCallback(() => {
        if (previewState.selectedMedia) {
            let currentMediaIndex = mediaList.indexOf(previewState.selectedMedia);
            let nextMediaIndex = mediaList.length >= currentMediaIndex ? 0 : currentMediaIndex + 1;
            setPreviewState(ps => ({ ...ps, selectedMedia: mediaList[nextMediaIndex] }));
        }
    }, [mediaList, previewState])

    return (
        <>
        {previewState.selectedMedia && 
            <MediaPreview 
                media={previewState.selectedMedia} 
                show={previewState.show} 
                onClose={() => setPreviewState({ show: false })}
                onNext={previewNextMedia}
                onPrevious={previewPreviousMedia}
            />
        }
        {isInfinite ? 
            <InfiniteThumbnails
                mediaQuery={mediaQuery}
                mediaList={mediaList}
                setMediaList={setMediaList}
                distinguishAlbumMedia={linkToAlbums}
                onThumbnailClick={onThumbnailClick}
                //onMediaLoad={(count) => setPageNumber(count % mediaPerPage)}
                thumbnailContainerStyle={{}}/> 
            :
            <>
                <PaginatedThumbnails
                    pageNumber={pageNumber}
                    setPageNumber={(pn) => { navigate({name: 'search', data: { ...navigationData, p: pn }}); setPageNumber(pn); }}
                    mediaQuery={mediaQuery}
                    mediaPerPage={mediaPerPage}
                    mediaList={mediaList}
                    setMediaList={setMediaList}
                    onThumbnailClick={onThumbnailClick}
                    distinguishAlbumMedia={linkToAlbums}
                    thumbnailContainerStyle={{}}/>
                <div style={{textAlign: 'center'}}>
                    <a style={{color: 'white'}} className='btn btn-primary' onClick={() => enableInfiniteScrolling()}>Infinite Scrolling</a>
                </div>
            </>
        }
        </>
    );
}
