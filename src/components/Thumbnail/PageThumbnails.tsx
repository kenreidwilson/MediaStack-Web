import Media from '../../types/Media';
import IMediaSearchQuery from '../../types/IMediaSearchQuery';
import React, { useState } from 'react';
import useNavigation from '../../hooks/useNavigation';
import InfiniteThumbnails from './InfiniteThumbnails';
import PaginatedThumbnails from './PaginatedThumbnails';

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

    const onThumbnailClick = (event: React.MouseEvent, media: Media) => {
        if (linkToAlbums && media.albumID) {
            navigate({ name: 'album', data: { id: media.albumID } });
        }
        else {
            navigate({ name: 'media', data: { id: media.id } });
        }
    }

    return (
        <>
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
