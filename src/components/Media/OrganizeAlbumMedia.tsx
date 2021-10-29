import Media from '../../types/Media';
import { useState, useContext } from 'react';
import useMedia from '../../hooks/useMedia';
import { ErrorContext } from '../../contexts/ErrorContext';
import DraggableThumbnails from '../Thumbnail/DraggableThumbnails';

type Props = {
    mediaList: Media[],
    setMediaList: Function,
    onSave: Function
}

export default function OrganizeAlbumSection({ mediaList, setMediaList, onSave }: Props ) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { update } = useMedia();

    const { addError } = useContext(ErrorContext);

    const handleSave = async () => {

        setIsLoading(true);
        for (let m of mediaList){
            try {
                await update({ ID: m.id, albumOrder: mediaList.indexOf(m)});
                setIsLoading(false);
                onSave();
            } catch (e) {
                addError(e as Error);
            }
        }   
    }

    return (
            <div>
                <DraggableThumbnails mediaList={mediaList} onReorder={setMediaList}/>
                <button className='btn btn-primary' disabled={isLoading} onClick={handleSave}>Save</button>
            </div>
        );
}
