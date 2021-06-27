import React, { useState, useEffect } from 'react';

import { TagsRequest } from '../../api/requests/TagRequests';
import TagsTable from '../../components/TagsTable/TagsTable';
import BannerAlert from '../../components/BannerAlert/BannerAlert';
import Navigation from '../../components/Navigation/Nav';
import Tag from '../../model/Tag';
import MediaSearchQuery from '../../api/requests/RequestBodies/MediaSearchQuery';

export default function TagsPage() {
    const [tags, setTags] = useState<Tag[]>([]);
    const [alerts, setAlerts] = useState<any[]>([]);

    useEffect(() => {
        new TagsRequest().send().then(response => {
            setTags(response.tags);
        }).catch(error => {
            setAlerts([...alerts, <BannerAlert variant="danger" heading="API Error:" body={error.message}/>]);
        });
    }, []);

    return ( 
        <React.Fragment>
            <Navigation />
            {alerts.map(errorComponent => errorComponent)}
            <TagsTable onTagClick={(searchQuery: MediaSearchQuery) => console.log(searchQuery)}/>
        </React.Fragment>
     );
}
