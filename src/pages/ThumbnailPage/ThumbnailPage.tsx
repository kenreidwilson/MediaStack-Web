import React, { useState, useEffect, useContext } from 'react';

import Navigation from '../../components/Navigation/Nav';
import BannerAlert from '../../components/BannerAlert/BannerAlert';
import { MediaContext } from '../../MediaContext';
import PageThumbnails from '../../components/PageThumbnails/PageThumbnails';
import { IMediaSearchQuery, MediaRepository } from '../../repositories/MediaRepository';

export default function ThumbnailPageComponent() {
    const {getQuery, setQuery} = useContext(MediaContext);

    const [linkToAlbums, setLinkToAlbums] = useState<boolean>(false);
    const [alerts, setAlerts] = useState<any[]>([]);

    useEffect(() => {
        let query: IMediaSearchQuery = getQuery();
        new MediaRepository().search(query).then(response => {
            setLinkToAlbums(query.mode === 2);
            let mediaList = response.media;
            if (mediaList.length === 0) {
                setAlerts([...alerts, <BannerAlert variant="warning" heading="API Response:" body="Nothing was found."/>]);
            }
        }).catch(error => { 
            setAlerts([...alerts, <BannerAlert variant="danger" heading="API Error: " body={error.message}/>]);
        });
    }, [])

    return ( 
        <React.Fragment>
            <Navigation />
            {alerts.map(errorComponent => errorComponent)}
            <PageThumbnails
                baseQuery={getQuery()}
                linkToAlbums={linkToAlbums}
                mediaPerPage={30}/>
        </React.Fragment>
     );
}
