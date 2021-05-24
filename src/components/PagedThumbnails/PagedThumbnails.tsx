import React, { useState, useEffect } from 'react';
import { Pagination, Spinner } from 'react-bootstrap';
import MediaSearchQuery from '../../api/requests/RequestBodies/MediaSearchQuery';
import { SearchRequest } from '../../api/requests/SearchRequests';
import Media from '../../model/Media';
import MediaThumbnails from '../MediaThumbnails/MediaThumbnails';

type Props = {
    baseQuery: MediaSearchQuery,
    linkToAlbums: boolean,
    mediaPerPage: number
};

export default function PagedThumbnails({baseQuery, linkToAlbums, mediaPerPage}: Props) {

    const maxPaginationTabs = 5;

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [numberOfPages, setNumberOfPages] = useState<number>(0);
    const [mediaList, setMediaList] = useState<Media[]>([]);
    const [isMediaLoading, setIsMediaLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchMediaList(1);
    }, []);

    const fetchMediaList = (pageNumber: number) => {
        console.log(pageNumber);
        setIsMediaLoading(true);
        let finalQuery = baseQuery;
        finalQuery.offset = (pageNumber - 1) * mediaPerPage;
        finalQuery.count = mediaPerPage;
        new SearchRequest(finalQuery).send().then(response => {
            setMediaList(response.media);
            setNumberOfPages(determineNumberOfPages(response.total));
            setIsMediaLoading(false);
        });
    };

    const determineNumberOfPages = (count: number) => Math.ceil(count / mediaPerPage);

    const goToPage = (pageNumber: number) => {
        setMediaList([]);
        setPageNumber(pageNumber);
        fetchMediaList(pageNumber);
    };
    
    return (
        <div>
            {isMediaLoading ? <Spinner animation="border" variant="primary"/> :
            <MediaThumbnails mediaList={mediaList} linkToAlbums={linkToAlbums}/>}
            <div style={{display: 'flex'}}>
                <Pagination style={{margin: 'auto'}}>
                    <Pagination.Prev disabled={pageNumber === 1} onClick={() => goToPage(pageNumber - 1)}/>
                    
                    {pageNumber > 3 ? <Pagination.Item key={1} onClick={() => goToPage(1)}>1</Pagination.Item> : null}
                    {pageNumber > 4 ? <Pagination.Ellipsis /> : null}

                    {pageNumber - 2 > 0 ? <Pagination.Item key={pageNumber - 2} onClick={() => goToPage(pageNumber - 2)}>{pageNumber - 2}</Pagination.Item> : null}
                    {pageNumber - 1 > 0 ? <Pagination.Item key={pageNumber - 1} onClick={() => goToPage(pageNumber - 1)}>{pageNumber - 1}</Pagination.Item> : null}
                    <Pagination.Item key={pageNumber} active>{pageNumber}</Pagination.Item>
                    {pageNumber + 1 <= numberOfPages ? <Pagination.Item key={pageNumber + 1} onClick={() => goToPage(pageNumber + 1)}>{pageNumber + 1}</Pagination.Item> : null}
                    {pageNumber + 2 <= numberOfPages ? <Pagination.Item key={pageNumber + 2} onClick={() => goToPage(pageNumber + 2)}>{pageNumber + 2}</Pagination.Item> : null}

                    {pageNumber + 4 <= numberOfPages ? <Pagination.Ellipsis /> : null}
                    {pageNumber + 3 <= numberOfPages ? <Pagination.Item key={numberOfPages} onClick={() => goToPage(numberOfPages)}>{numberOfPages}</Pagination.Item> : null}

                    <Pagination.Next disabled={pageNumber === numberOfPages} onClick={() => goToPage(pageNumber + 1)}/>
                </Pagination>
            </div>
        </div>
    );
}
