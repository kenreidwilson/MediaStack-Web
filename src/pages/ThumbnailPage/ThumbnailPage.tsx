import React, { useState, useEffect, useContext } from 'react';

import Navigation from '../../components/Navigation/Nav';
import MediaThumbnails from '../../components/MediaThumbnails/MediaThumbnails';
import BannerAlert from '../../components/BannerAlert/BannerAlert';

import { SearchRequest } from '../../api/requests/SearchRequests';
import Media from '../../model/Media';
import { MediaContext } from '../../MediaContext';
import MediaSearchQuery from '../../api/requests/RequestBodies/MediaSearchQuery';

export default function ThumbnailPageComponent() {
    const {getQuery, setQuery} = useContext(MediaContext);

    const [collapseAlbums, setCollapseAlbums] = useState<boolean>(true);
    const [mediaList, setMediaList] = useState<Media[]>([]);
    const [alerts, setAlerts] = useState<any[]>([]);

    useEffect(() => {
        console.log("searching...", getQuery());
        new SearchRequest(getQuery()).send().then(mediaList => {
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
                <MediaThumbnails
                    showAlbumCoverOnly={collapseAlbums}
                    mediaList={mediaList}/> 
            : null}
        </React.Fragment>
     );
}
