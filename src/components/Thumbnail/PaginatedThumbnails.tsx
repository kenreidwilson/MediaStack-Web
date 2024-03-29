import { Media } from '../../types';
import { MediaSearchQuery } from '../../types';
import React, { CSSProperties, useEffect, useContext, useCallback, useRef } from 'react';
import { ErrorContext } from '../../contexts/ErrorContext';
import useMedia from '../../hooks/useMedia';
import usePaginatedPromiseData, { PaginatedData } from '../../hooks/usePaginatedPromiseData';
import useSwipeable from '../../hooks/useSwipeable';
import { Spinner } from 'react-bootstrap';
import Thumbnails from './Thumbnails';
import MSPagination from '../Misc/MSPagination';

type Props = {
    mediaQuery: MediaSearchQuery,
    mediaPerPage: number,
    onMediaListUpdate: (mediaList: Media[]) => void,
    initialPageNumber?: number,
    setPageNumber?: (pageNumber: number) => void,
    onThumbnailClick?: (event: React.MouseEvent, media: Media) => void,
    onThumbnailMiddleClick?: (event: React.MouseEvent, media: Media) => void,
    isSwipable?: boolean,
    distinguishAlbumMedia?: boolean,
    thumbnailContainerStyle?: CSSProperties
};

export default function PaginatedThumbnails({ 
    mediaQuery, 
    mediaPerPage, 
    onMediaListUpdate,
    initialPageNumber,
    setPageNumber = () => {},
    onThumbnailClick,
    onThumbnailMiddleClick,
    isSwipable = true,
    distinguishAlbumMedia = false}: Props) {

    const { addError } = useContext(ErrorContext);
    const { search } = useMedia();

    const fetchMediaList: (start: number, end: number) => Promise<PaginatedData<Media>> = useCallback((start: number, end: number) => {
        return search({ ...mediaQuery, count: end - start, offset: start });
    }, [mediaQuery]);

    const { isLoading, error, data, totalPages, currentPage, setPage } = 
        usePaginatedPromiseData<Media>({ getData: fetchMediaList, dataPerPage: mediaPerPage, initialPageNumber});

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

    const thumbnailsRef = useRef<HTMLDivElement | null>(null);
    
    const onSwipeNext = () => {
        const newPage = currentPage == 1 ? 1 : currentPage - 1;
        setPage(newPage);
        setPageNumber(newPage);
    }

    const onSwipePrevious = () => {
        const newPage = currentPage == totalPages ? 1 : currentPage + 1;
        setPage(newPage);
        setPageNumber(newPage);
    }

    const { resetPosition, enable, disable } = useSwipeable({
        divRef: thumbnailsRef, 
        onNext: onSwipeNext, 
        onPrevious: onSwipePrevious,
        move: false});

    return (
        <div style={{ width: '100vw', overflow: 'hidden' }}>
            {isLoading ? <Spinner animation='border' variant='primary'/> : 
            <div 
                ref={thumbnailsRef} 
                style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Thumbnails 
                    mediaList={data!} 
                    onClick={onThumbnailClick} 
                    onMiddleClick={onThumbnailMiddleClick}
                    distinguishAlbumMedia={distinguishAlbumMedia}/>
            </div>}
            <div style={{display: 'flex', marginTop: '5px'}}>
                <div style={{margin: 'auto'}}>
                    <MSPagination pageNumber={currentPage} numberOfPages={totalPages} onNavigate={(pn) => { setPage(pn); setPageNumber(pn); }}/>
                </div>
            </div>
        </div>
    );
}
