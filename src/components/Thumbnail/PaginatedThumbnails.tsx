import Media from '../../types/Media';
import IMediaSearchQuery from '../../types/IMediaSearchQuery';
import { CSSProperties, useEffect, useContext, useCallback, useRef } from 'react';
import { ErrorContext } from '../../contexts/ErrorContext';
import useMedia from '../../hooks/useMedia';
import usePaginatedPromiseData, { PaginatedData } from '../../hooks/usePaginatedPromiseData';
import useSwipeable from '../../hooks/useSwipeable';
import { Spinner } from 'react-bootstrap';
import Thumbnails from './Thumbnails';
import MSPagination from '../Misc/MSPagination';

type Props = {
    mediaQuery: IMediaSearchQuery,
    mediaPerPage: number,
    onMediaListUpdate: (mediaList: Media[]) => void,
    setPageNumber?: (pageNumber: number) => void,
    onThumbnailClick?: (event: React.MouseEvent, media: Media) => void,
    isSwipable?: boolean,
    distinguishAlbumMedia?: boolean,
    thumbnailContainerStyle?: CSSProperties
};

export default function PaginatedThumbnails({ 
    mediaQuery, 
    mediaPerPage, 
    onMediaListUpdate,
    setPageNumber = () => {},
    onThumbnailClick = () => {},
    isSwipable = true,
    distinguishAlbumMedia = false}: Props) {

    const { addError } = useContext(ErrorContext);
    const { search } = useMedia();

    const fetchMediaList: (start: number, end: number) => Promise<PaginatedData<Media>> = useCallback((start: number, end: number) => {
        return search({ ...mediaQuery, count: end - start, offset: start });
    }, [mediaQuery]);

    const { isLoading, error, data, totalPages, currentPage, setPage } = 
        usePaginatedPromiseData<Media>({ getData: fetchMediaList, dataPerPage: mediaPerPage});

    useEffect(() => {
        if (error !== undefined) {
            addError(error);
        }
    }, [error]);

    useEffect(() => {
        if (data !== undefined) {
            onMediaListUpdate(data);
        }
    }, [data])

    const thumbnailsRef = useRef(null);
    const { resetPosition, enable, disable } = useSwipeable(
        thumbnailsRef, 
        () => setPage(currentPage == 1 ? 1 : currentPage - 1), 
        () => setPage(currentPage == totalPages ? 1 : currentPage + 1));

    useEffect(() => {
        if (isSwipable) {
            enable();
        } else {
            disable();
        }
    }, [isSwipable]);

    return (
        <>
            {isLoading ? <Spinner animation='border' variant='primary'/> : 
            <div ref={thumbnailsRef} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Thumbnails mediaList={data!} onClick={onThumbnailClick} distinguishAlbumMedia={distinguishAlbumMedia}/>
            </div>}
            <div style={{display: 'flex', marginTop: '5px'}}>
                <div style={{margin: 'auto'}}>
                    <MSPagination pageNumber={currentPage} numberOfPages={totalPages} onNavigate={(pn) => { setPage(pn); setPageNumber(pn); }}/>
                </div>
            </div>
        </>
    );
}
