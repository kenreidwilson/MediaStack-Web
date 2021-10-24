import Tag from '../../types/Tag';
import { useEffect, useState } from 'react';
import useTags from '../../hooks/useTags';
import usePromise from '../../hooks/usePromise';
import BaseEditModal from './BaseEditModal';
import TagUpdateForm from '../Forms/TagUpdateForm';

type Props = {
    tag: Tag,
    isShown: boolean,
    onClose?: () => void,
    onSave?: (updatedTag: Tag) => void
}

export default function TagEditModal({ tag, isShown, onClose, onSave = () => {} }: Props) {

    const { update } = useTags();
    const [updateRequest, setUpdateRequest] = useState<Tag>(tag);
    const { isLoading, error, result, resolve, reset } = usePromise(() => update(updateRequest));

    useEffect(() => {
        setUpdateRequest(tag);
    }, [tag]);

    useEffect(() => {
        if (result) {
            onSave(result);
        }
    }, [result]);

    useEffect(() => {
        if (!isShown) {
            reset();
            setUpdateRequest(tag);
        }
    }, [isShown]);

    return (
        <BaseEditModal 
            title={`Edit Tag: ${updateRequest.id}`}
            isShown={isShown}
            isLoading={isLoading}
            errorMessage={error?.message}
            onClose={onClose} 
            onSave={resolve}>
                <TagUpdateForm request={updateRequest} onChange={setUpdateRequest}/>
        </BaseEditModal>
    );
}
