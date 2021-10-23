import Media from '../../types/Media';
import IMediaUpdateRequest from '../../types/IMediaUpdateRequest';
import { useState, useEffect } from 'react';
import useMedia from '../../hooks/useMedia';
import usePromise from '../../hooks/usePromise';
import MediaUpdateForm from '../Forms/MediaUpdateForm';
import BaseEditModal from './BaseEditModal';

type Props = {
    media: Media,
    isShown: boolean,
    onClose: () => void,
    onSave: (updatedMedia: Media) => void
}

export default function MediaInfoModal({ media, isShown, onClose, onSave }: Props) {

    const { update } = useMedia();
    const [updateRequest, setUpdateRequest] = useState<IMediaUpdateRequest>(
        { 
            ID: media.id,
            categoryID: media.categoryID,
            artistID: media.artistID,
            albumID: media.albumID,
            source: media.source,
            tagIDs: media.tags.map(tag => tag.id)
        }
    );

    const { isLoading, error, result, resolve, reset } = usePromise(() => update(updateRequest));

    useEffect(() => {
        if (result) {
            onSave(result);
        }
    }, [result]);

    useEffect(() => {
        if (!isShown) {
            reset();
        }
    }, [isShown]);

    return (
        <BaseEditModal 
            title='Edit Media'
            isShown={isShown} 
            isLoading={isLoading}
            errorMessage={error?.message}
            onClose={onClose} 
            onSave={resolve}>
            <MediaUpdateForm request={updateRequest} onChange={setUpdateRequest}/>
        </BaseEditModal>
    );
}
