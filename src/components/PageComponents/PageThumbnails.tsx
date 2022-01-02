import { Media, MediaSearchQuery } from '../../types';
import { useCallback, useState, useEffect, useRef } from 'react';
import useNavigation from '../../hooks/useNavigation';
import InfiniteThumbnails from '../Thumbnail/InfiniteThumbnails';
import PaginatedThumbnails from '../Thumbnail/PaginatedThumbnails';
import MediaPreview from '../Media/MediaPreview';
import usePlatform from '../../hooks/usePlatform';

type Props = {
    mediaQuery: MediaSearchQuery,
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

    const { navigate, navigateToNewWindow, getNavigationData } = useNavigation();
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

    const { isMobile } = usePlatform();

    const showMediaPreview = (media: Media) => {
        let selectedMedia = mediaList.find(m => m.id == media.id);

        if (isMobile) {
            if (selectedMedia) {
                setPreviewState({ selectedMedia: media, show: true });
            }
        } else {
            navigateToMediaPage(media);
        }
    }

    const navigateToMediaPage = (media: Media) => {
        if (linkToAlbums && media.albumID) {
            navigate({ name: 'album', data: { id: media.albumID } });
        }
        else {
            navigate({ name: 'media', data: { id: media.id } });
        }
    }

    const navigateToMediaPageInNewTab = (media: Media) => {
        if (linkToAlbums && !isNaN(media.albumID as number)) {
            navigateToNewWindow({ name: 'album', data: { id: media.albumID } });
        } else {
            navigateToNewWindow({ name: 'media', data: { id: media.id } });
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
                onMediaClick={(_, m) => navigateToMediaPage(m)}
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
                onThumbnailClick={(_, m) => showMediaPreview(m)}
                //onMediaLoad={(count) => setPageNumber(count % mediaPerPage)}
                thumbnailContainerStyle={{}}/> 
            :
            <>
                <PaginatedThumbnails
                    setPageNumber={(pn) => { navigate({name: 'search', data: { ...navigationData, p: pn }}); setPageNumber(pn); }}
                    mediaQuery={mediaQuery}
                    mediaPerPage={mediaPerPage}
                    onMediaListUpdate={setMediaList}
                    onThumbnailClick={(_, m) => showMediaPreview(m)}
                    onThumbnailMiddleClick={(_, m) => navigateToMediaPageInNewTab(m)}
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
