import Media from '../../types/Media';
import IMediaSearchQuery from '../../types/IMediaSearchQuery';
import React, { useCallback, useState, useEffect, useRef } from 'react';
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
        let selectedMedia = mediaList.find(m => m.id == media.id);
        if (selectedMedia) {
            setPreviewState({ selectedMedia: media, show: true });
        }
    }

    const onPreviewClick = (event: React.MouseEvent, media: Media) => {
        if (linkToAlbums && media.albumID) {
            navigate({ name: 'album', data: { id: media.albumID } });
        }
        else {
            navigate({ name: 'media', data: { id: media.id } });
        }
    }

    const previewMediaIndex = useRef<number | null>(null);

    useEffect(() => {
        if (previewState.selectedMedia)
            previewMediaIndex.current = mediaList.indexOf(previewState.selectedMedia)
    }, [previewState.selectedMedia]);

    const previewNextMedia = useCallback(() => {
        if (previewMediaIndex.current !== null) {
            previewMediaIndex.current = previewMediaIndex.current == 0 ? mediaList.length - 1 : previewMediaIndex.current - 1;
            setPreviewState(ps => ({ ...ps, selectedMedia: mediaList[previewMediaIndex.current!] }));
        }
        return Promise.resolve();
    }, [previewState.selectedMedia]);

    const previewPreviousMedia = useCallback(() => {
        if (previewMediaIndex.current !== null) {
            previewMediaIndex.current = mediaList.length - 1 == previewMediaIndex.current ? 0 : previewMediaIndex.current + 1;
            setPreviewState(ps => ({ ...ps, selectedMedia: mediaList[previewMediaIndex.current!] }));
        }
        return Promise.resolve();
    }, [previewState.selectedMedia]);

    return (
        <>
        {previewState.selectedMedia && 
            <MediaPreview 
                media={previewState.selectedMedia} 
                show={previewState.show} 
                onClose={() => setPreviewState({ show: false })}
                onMediaClick={onPreviewClick}
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
                    setPageNumber={(pn) => { navigate({name: 'search', data: { ...navigationData, p: pn }}); setPageNumber(pn); }}
                    mediaQuery={mediaQuery}
                    mediaPerPage={mediaPerPage}
                    onMediaListUpdate={setMediaList}
                    onThumbnailClick={onThumbnailClick}
                    distinguishAlbumMedia={linkToAlbums}
                    thumbnailContainerStyle={{}}
                    isSwipable={!previewState.show}/>
                <div style={{textAlign: 'center'}}>
                    <a style={{color: 'white'}} className='btn btn-primary' onClick={() => enableInfiniteScrolling()}>Infinite Scrolling</a>
                </div>
            </>
        }
        </>
    );
}
