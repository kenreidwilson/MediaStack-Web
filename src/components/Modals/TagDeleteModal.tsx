import useTags from '../../hooks/useTags';
import Tag from '../../types/Tag';
import BaseEditModal from './BaseEditModal';

type Props = {
    tag: Tag,
    isShown: boolean,
    onClose?: () => void,
    onSave?: (tag: Tag) => void
};

export default function TagDeleteModal({ tag, isShown, onClose, onSave = () => {} }: Props) {

    const { delete: deleteTag } = useTags();

    const onTagDelete = (): Promise<void> => {
        return deleteTag(tag).then(() => onSave(tag));
    }

    return (
        <BaseEditModal title="Delete Tag" isShown={isShown} onClose={onClose} onSave={onTagDelete}>
            <p>Delete tag: {tag.name}? (ID: {tag.id})</p>
        </BaseEditModal>
    );
};
