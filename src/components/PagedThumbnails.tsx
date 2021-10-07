import { useState, useEffect, useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import Media from '../types/Media';
import { IMediaSearchQuery, MediaRepository } from '../repositories/MediaRepository';
import MediaThumbnails from './MediaThumbnails';
import MSPagination from './MSPagination';
import { ErrorContext } from '../contexts/ErrorContext';

type Props = {
    baseQuery: IMediaSearchQuery,
    linkToAlbums: boolean,
    mediaPerPage: number
};

export default function PagedThumbnails({baseQuery, linkToAlbums, mediaPerPage}: Props) {

    const { addError } = useContext(ErrorContext);

    const [numberOfPages, setNumberOfPages] = useState<number>(0);
    const [mediaList, setMediaList] = useState<Media[]>([]);
    const [isMediaLoading, setIsMediaLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchMediaList(getPageNumber());
    }, []);

    const getPageNumber = () => {
        var url = new URL(window.location.href);
        let pageNumber = url.searchParams.get("p");
        return pageNumber ? +pageNumber : 1;
    }

    const fetchMediaList = (pageNumber: number) => {
        setIsMediaLoading(true);
        let finalQuery = baseQuery;
        finalQuery.offset = (pageNumber - 1) * mediaPerPage;
        finalQuery.count = mediaPerPage;
        new MediaRepository().search(finalQuery).then(response => {
            setMediaList(response.media);
            setNumberOfPages(determineNumberOfPages(response.total));
            setIsMediaLoading(false);
        })
        .catch(addError);
    };

    const determineNumberOfPages = (count: number) => Math.ceil(count / mediaPerPage);

    const goToPage = (pageNumber: number) => {
        let urlParams = new URLSearchParams(window.location.search);
        urlParams.set("p", `${pageNumber}`);
        window.location.search = urlParams.toString();
    };
    
    return (
        <div>
            {isMediaLoading ? <Spinner animation="border" variant="primary"/> :
            <MediaThumbnails mediaList={mediaList} linkToAlbums={linkToAlbums}/>}
            <div style={{display: 'flex', marginTop: '5px'}}>
                <div style={{margin: 'auto'}}>
                    <MSPagination pageNumber={getPageNumber()} numberOfPages={numberOfPages} onNavigate={goToPage}/>
                </div>
            </div>
        </div>
    );
}
