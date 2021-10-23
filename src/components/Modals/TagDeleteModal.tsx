import Tag from '../../types/Tag';
import useTags from '../../hooks/useTags';
import { useEffect } from 'react';
import usePromise from '../../hooks/usePromise';
import BaseEditModal from './BaseEditModal';

type Props = {
    tag: Tag,
    isShown: boolean,
    onClose?: () => void,
    onSave?: (tag: Tag) => void
};

export default function TagDeleteModal({ tag, isShown, onClose, onSave = () => {} }: Props) {

    const { delete: deleteTag } = useTags();
    const { isLoading, error, result, resolve, reset } = usePromise(() => deleteTag(tag));

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
            title="Delete Tag" 
            isShown={isShown} 
            isLoading={isLoading}
            errorMessage={error?.message}
            onClose={onClose} 
            onSave={resolve}>
            <p>Delete tag: {tag.name}? (ID: {tag.id})</p>
        </BaseEditModal>
    );
}
