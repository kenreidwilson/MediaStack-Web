import Media from '../../types/Media';
import { useState } from 'react';
import SelectableThumbnails from '../Thumbnail/SelectableThumbnails';
import MediaListEditModal from '../Modals/MediaListEditModal';
import MediaListUpdateMenu from '../Menus/MediaListUpdateMenu';

type Props = {
    mediaList: Media[],
    setMediaList?: (mediaList: Media[]) => void,
    onCancel?: () => void
}

export default function MediaListUpdate({ mediaList, setMediaList = () => {}, onCancel }: Props) {

    const [selectedMedia, setSelectedMedia] = useState<Media[]>([]);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);

    const onSelecteMediaSave = (updatedSelectedMedia: Media[]): void => {
        let updatedMediaList: Media[] = [];

        for (const media of mediaList) {
            let possibleSelectedMedia = updatedSelectedMedia.find(m => m.id === media.id);
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
                    <div style={{ textAlign: 'center'}}><h2>Edit Mode: Select Media</h2></div>
                    
                    <div style={{ marginBottom: '5px', display: 'flex', justifyContent: 'center'}}>
                        <MediaListUpdateMenu 
                            onEdit={() => setShowEditModal(true)}
                            onDeselectAll={() => setSelectedMedia([])}
                            onSelectAll={() => setSelectedMedia(mediaList)}
                            onCancel={onCancel}/>
                    </div>
                    
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                <SelectableThumbnails 
                        mediaList={mediaList}
                        selectedMedia={selectedMedia}
                        onSelectionChange={setSelectedMedia}/>
            </div>
        </>
    );
}
