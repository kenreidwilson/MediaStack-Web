import { useEffect } from 'react';
import usePromise from '../../hooks/usePromise';
import BaseEditModal from './BaseEditModal';

type Props<T> = {
    entity: T,
    isShown: boolean,
    deleteEntity: (entity: T) => Promise<void>,
    title?: string,
    body?: string,
    onClose?: () => void,
    onSave?: (entity: T) => void
};

export default function GenericDeleteModal<T>
    ({entity, isShown, deleteEntity, title, body, onClose, onSave = () => {} }: Props<T>) {

    const { isLoading, error, result, resolve, reset } = usePromise(() => deleteEntity(entity));

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
            title={title}
            isShown={isShown} 
            isLoading={isLoading}
            errorMessage={error?.message}
            onClose={onClose} 
            onSave={resolve}>
            <p>{body}</p>
        </BaseEditModal>
    );
}
