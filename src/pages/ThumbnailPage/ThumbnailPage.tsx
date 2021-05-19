import React, { useState, useEffect } from 'react';

import Navigation from '../../components/Navigation/Nav';
import MediaThumbnails from '../../components/MediaThumbnails/MediaThumbnails';
import BannerAlert from '../../components/BannerAlert/BannerAlert';

import { SearchRequest } from '../../api/requests/SearchRequests';
import Media from '../../model/Media';
import MediaSearchQuery from '../../api/requests/RequestBodies/MediaSearchQuery';

export default function ThumbnailPageComponent() {
    const [collapseAlbums, setCollapseAlbums] = useState<boolean>(true);
    const [mediaList, setMediaList] = useState<Media[]>([]);
    const [alerts, setAlerts] = useState<any[]>([]);

    useEffect(() => {
        new SearchRequest(new MediaSearchQuery()).send().then(mediaList => {
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
