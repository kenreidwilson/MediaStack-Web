import { IMediaSearchQuery } from '../repositories/MediaRepository';
import AutoPagedThumbnails from './AutoPagedThumbnails';
import PagedThumbnails from './PagedThumbnails';

type Props = {
    baseQuery: IMediaSearchQuery,
    linkToAlbums: boolean,
    mediaPerPage: number
};

export default function PageThumbnails({baseQuery, linkToAlbums, mediaPerPage}: Props) {

    const isInfiniteScrollingEnabled = () => {
        var url = new URL(window.location.href);
        let pageNumber = url.searchParams.get("p");
        return pageNumber !== null && +pageNumber === -1;
    }

    const enableInfiniteScrolling = () => {
        let urlParams = new URLSearchParams(window.location.search);
        urlParams.set("p", "-1");
        window.location.search = urlParams.toString();
    }

    return (
        <div>
            {!isInfiniteScrollingEnabled() ? 
            <div>
                <PagedThumbnails
                    baseQuery={baseQuery}
                    mediaPerPage={mediaPerPage}
                    linkToAlbums={linkToAlbums}/>
                <div style={{textAlign: "center"}}>
                    <a style={{color: "white"}} className="btn btn-primary" onClick={() => enableInfiniteScrolling()}>Infinite Scrolling</a>
                </div>
            </div>
            : null}
            {isInfiniteScrollingEnabled() ? 
            <AutoPagedThumbnails
                baseQuery={baseQuery}
                linkToAlbums={linkToAlbums}/>
            : null}
        </div>
    );
}