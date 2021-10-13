import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Media from '../types/Media';
import { IMediaUpdateRequest, MediaRepository } from '../repositories/MediaRepository';
import MediaUpdateForm from '../components/MediaUpdateForm';

export default function ExplorePage() {

    const [mediaList, setMediaList] = useState<Media[]>([]);
    const [selectedMedia, setSelectedMedia] = useState<Media[]>([]);
    const [updateRequest, setUpdateRequest] = useState<IMediaUpdateRequest>( { ID: -1 } );

    const mediaRepo = new MediaRepository();

    useEffect(() => {
        new MediaRepository().search({}).then(response => {
            setMediaList(response.data);
        });
    }, [])

    const updateMedia = (score: number) => {
        return Promise.all(selectedMedia.map(m => mediaRepo.update({ ID: m.id, score, tagIDs: [1] })));
    }

    return (
        <React.Fragment>
            <Navigation />
            {mediaList.length > 0 ? <MediaUpdateForm request={updateRequest} onChange={setUpdateRequest} /> : null}
        </React.Fragment>
    );
};
