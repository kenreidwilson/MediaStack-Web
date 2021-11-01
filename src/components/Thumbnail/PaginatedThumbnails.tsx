import Media from '../../types/Media';
import IMediaSearchQuery from '../../types/IMediaSearchQuery';
import { useState, useEffect, useContext, CSSProperties } from 'react';
import { ErrorContext } from '../../contexts/ErrorContext';
import useMedia from '../../hooks/useMedia';
import { Spinner } from 'react-bootstrap';
import Thumbnails from './Thumbnails';
import MSPagination from '../Misc/MSPagination';

type Props = {
    mediaQuery: IMediaSearchQuery,
    mediaPerPage: number,
    pageNumber: number,
    mediaList: Media[],
    setMediaList: (mediaList: Media[]) => void,
    setPageNumber?: (pageNumber: number) => void,
    onThumbnailClick?: (event: React.MouseEvent, media: Media) => void,
    distinguishAlbumMedia?: boolean,
    thumbnailContainerStyle?: CSSProperties
};

export default function PaginatedThumbnails({ 
    mediaQuery, 
    mediaPerPage, 
    pageNumber, 
    mediaList,
    setMediaList,
    setPageNumber = () => {},
    onThumbnailClick = () => {},
    distinguishAlbumMedia = false,
    thumbnailContainerStyle }: Props) {

    const { addError } = useContext(ErrorContext);
    const { search } = useMedia();

    const [numberOfPages, setNumberOfPages] = useState<number>(0);
    const [isMediaLoading, setIsMediaLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchMediaList(pageNumber);
    }, [pageNumber]);

    useEffect(() => {
        setMediaList([]);
        fetchMediaList(pageNumber);
    }, [mediaQuery]);

    const fetchMediaList = (pageNumber: number) => {
        setIsMediaLoading(true);
        let finalQuery = mediaQuery;
        finalQuery.offset = (pageNumber - 1) * mediaPerPage;
        finalQuery.count = mediaPerPage;
        search(finalQuery).then(response => {
            setMediaList(response.data);
            setNumberOfPages(determineNumberOfPages(response.total));
            setIsMediaLoading(false);
        })
        .catch(addError);
    };

    const determineNumberOfPages = (count: number) => Math.ceil(count / mediaPerPage);
    
    return (
        <>
            {isMediaLoading ? <Spinner animation='border' variant='primary'/> :
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Thumbnails mediaList={mediaList} onClick={onThumbnailClick} distinguishAlbumMedia={distinguishAlbumMedia}/>
            </div>}
            <div style={{display: 'flex', marginTop: '5px'}}>
                <div style={{margin: 'auto'}}>
                    <MSPagination pageNumber={pageNumber} numberOfPages={numberOfPages} onNavigate={setPageNumber}/>
                </div>
            </div>
        </>
    );
}
