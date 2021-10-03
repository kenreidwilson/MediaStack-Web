import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import SelectableThumbnails from '../components/SelectableThumbnails';
import Media from '../types/Media';
import { MediaRepository } from '../repositories/MediaRepository';

export default function ExplorePage() {

    const [mediaList, setMediaList] = useState<Media[]>([]);
    const [selectedMedia, setSelectedMedia] = useState<Media[]>([]);

    const mediaRepo = new MediaRepository();

    useEffect(() => {
        new MediaRepository().search({}).then(response => {
            setMediaList(response.media);
        });
    }, [])

    const updateMedia = (score: number) => {
        return Promise.all(selectedMedia.map(m => mediaRepo.update({ ID: m.id, score, tagIDs: [1] })));
    }

    return (
        <React.Fragment>
            <Navigation />
            <SelectableThumbnails mediaList={mediaList} selectedMedia={selectedMedia} onChange={setSelectedMedia} />
            <Button onClick={() => updateMedia(2).then(() => setSelectedMedia([]))}>Print</Button>
        </React.Fragment>
    );
};
