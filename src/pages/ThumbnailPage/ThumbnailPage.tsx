import React, { useState, useEffect, useContext } from 'react';

import Navigation from '../../components/Navigation/Nav';
import BannerAlert from '../../components/BannerAlert/BannerAlert';

import { SearchRequest } from '../../api/requests/SearchRequests';
import Media from '../../model/Media';
import { MediaContext } from '../../MediaContext';
import PagedThumbnails from '../../components/PagedThumbnails/PagedThumbnails';
import MediaSearchQuery from '../../api/requests/RequestBodies/MediaSearchQuery';

export default function ThumbnailPageComponent() {
    const {getQuery, setQuery} = useContext(MediaContext);

    const [linkToAlbums, setLinkToAlbums] = useState<boolean>(false);
    const [mediaList, setMediaList] = useState<Media[]>([]);
    const [alerts, setAlerts] = useState<any[]>([]);

    useEffect(() => {
        let query: MediaSearchQuery = getQuery();
        new SearchRequest(query).send().then(response => {
            setLinkToAlbums(query.mode === 2);
            let mediaList = response.media;
            if (mediaList.length === 0) {
                setAlerts([...alerts, <BannerAlert variant="warning" heading="API Response:" body="Nothing was found."/>]);
            }
            setMediaList(mediaList);
        }).catch(error => { 
            setAlerts([...alerts, <BannerAlert variant="danger" heading="API Error: " body={error.message}/>]);
        });
    }, [])

    return ( 
        <React.Fragment>
            <Navigation />
            {alerts.map(errorComponent => errorComponent)}
            {mediaList ? 
                <PagedThumbnails
                    baseQuery={getQuery()}
                    mediaPerPage={30}
                    linkToAlbums={linkToAlbums}/> 
            : null}
        </React.Fragment>
     );
}
