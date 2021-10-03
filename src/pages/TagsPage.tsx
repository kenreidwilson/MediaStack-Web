import React, { useState } from 'react';
import TagsTable from '../components/TagsTable';
import Navigation from '../components/Nav';
import { IMediaSearchQuery } from '../repositories/MediaRepository';

export default function TagsPage() {
    const [alerts, setAlerts] = useState<any[]>([]);

    return ( 
        <React.Fragment>
            <Navigation />
            {alerts.map(errorComponent => errorComponent)}
            <TagsTable onTagClick={(searchQuery: IMediaSearchQuery) => console.log(searchQuery)}/>
        </React.Fragment>
     );
}
