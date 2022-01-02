import { Media } from '../../types';
import { useState, useContext } from 'react';
import useMedia from '../../hooks/useMedia';
import { ErrorContext } from '../../contexts/ErrorContext';
import DraggableThumbnails from '../Thumbnail/DraggableThumbnails';
import MediaOrganizeMenu from '../Menus/MediaOrganizeMenu';

type Props = {
    initialMediaList: Media[],
    onSave?: (updatedMediaList: Media[]) => void,
    onCancel?: () => void
}

export default function OrganizeAlbumMedia({ initialMediaList, onSave = () => {}, onCancel = () => {} }: Props ) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [newMediaList, setNewMediaList] = useState<Media[]>(initialMediaList);

    const { update } = useMedia();
    const { addError } = useContext(ErrorContext);

    const handleSave = async () => {

        setIsLoading(true);
        // TODO: Make calls run in parallel. 
        for (let media of newMediaList){
            try {
                await update({ ID: media.id, albumOrder: newMediaList.indexOf(media)});
            } catch (e) {
                addError(e as Error);
            }
        }
        setIsLoading(false);
        onSave(newMediaList);
    }

    return (
            <>
                <div style={{ textAlign: 'center' }} ><h2>Organize Mode: Drag Media to Reorder</h2></div>
                <div style={{ marginBottom: '5px', display: 'flex', justifyContent: 'center'}}>
                    <MediaOrganizeMenu onSave={handleSave} onReset={() => setNewMediaList(initialMediaList)} onCancel={onCancel}/>
                </div>
                <DraggableThumbnails 
                    mediaList={newMediaList} 
                    onReorder={setNewMediaList}
                    style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}/>
            </>
        );
}
