import Media from '../types/Media';
import IMediaUpdateRequest from '../types/IMediaUpdateRequest';
import React, { useState, useEffect } from 'react';
import useMedia from '../hooks/useMedia';
import Navigation from '../components/Misc/Navigation';
import MediaUpdateForm from '../components/Forms/MediaUpdateForm';

export default function ExplorePage() {

    const [mediaList, setMediaList] = useState<Media[]>([]);
    const [selectedMedia, setSelectedMedia] = useState<Media[]>([]);
    const [updateRequest, setUpdateRequest] = useState<IMediaUpdateRequest>( { ID: -1 } );

    const { search, update } = useMedia();

    useEffect(() => {
        search({}).then(response => {
            setMediaList(response.data);
        });
    }, [])

    const updateMedia = (score: number) => {
        return Promise.all(selectedMedia.map(m => update({ ID: m.id, score, tagIDs: [1] })));
    }

    return (
        <React.Fragment>
            <Navigation />
            {mediaList.length > 0 ? <MediaUpdateForm request={updateRequest} onChange={setUpdateRequest} /> : null}
        </React.Fragment>
    );
};
