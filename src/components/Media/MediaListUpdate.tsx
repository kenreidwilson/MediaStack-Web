import Media from '../../types/Media';
import IMediaUpdateRequest from '../../types/IMediaUpdateRequest';
import { useState } from 'react';
import SelectableThumbnails from '../Thumbnail/SelectableThumbnails';
import MediaListEditModal from '../Modals/MediaListEditModal';
import { Button } from 'react-bootstrap';

type Props = {
    mediaList: Media[],
    setMediaList?: (mediaList: Media[]) => void,
    //onSave?: (updateRequests: IMediaUpdateRequest[]) => void
}

export default function MediaListUpdate({ mediaList, setMediaList = () => {} }: Props) {

    const [selectedMedia, setSelectedMedia] = useState<Media[]>([]);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);

    const onSelecteMediaSave = (updatedSelectedMedia: Media[]): void => {
        let updatedMediaList: Media[] = [];

        for (const media of mediaList) {
            let possibleSelectedMedia = selectedMedia.find(m => m.id === media.id);
            updatedMediaList.push(possibleSelectedMedia ? possibleSelectedMedia : media);
        }

        setMediaList(updatedMediaList);
    }

    return (
        <>
            {showEditModal && 
                <MediaListEditModal
                    isShown={showEditModal}
                    mediaList={selectedMedia} 
                    onClose={() => setShowEditModal(false)} 
                    onSave={(mediaList) => { setShowEditModal(false); onSelecteMediaSave(mediaList)}}/>}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                <SelectableThumbnails 
                        mediaList={mediaList}
                        selectedMedia={selectedMedia}
                        onSelectionChange={setSelectedMedia}/>
            </div>
            <div style={{ margin: 'auto', marginTop: '5px' }}>
                <Button onClick={() => setShowEditModal(true)}>Save</Button>
            </div>
        </>
    );
}
