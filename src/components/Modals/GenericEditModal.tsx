import { useEffect, useState } from 'react';
import usePromise from '../../hooks/usePromise';
import BaseEditModal from './BaseEditModal';
import GenericUpdateForm from '../Forms/GenericUpdateForm';

type Props<T> = {
    entity: T,
    isShown: boolean,
    editEntity: (entity: T) => Promise<T>,
    title?: string,
    onClose?: () => void,
    onSave?: (updatedTag: T) => void
}

export default function GenericEditModal<T extends { id: number, name: string }>({ entity, isShown, editEntity, title, onClose, onSave = () => {} }: Props<T>) {

    const [updateRequest, setUpdateRequest] = useState<T>(entity);
    const { isLoading, error, result, resolve, reset } = usePromise(() => editEntity(updateRequest));

    useEffect(() => {
        setUpdateRequest(entity);
    }, [entity]);

    useEffect(() => {
        if (result) {
            onSave(result);
        }
    }, [result]);

    useEffect(() => {
        if (!isShown) {
            reset();
            setUpdateRequest(entity);
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
                <GenericUpdateForm request={updateRequest} onChange={setUpdateRequest}/>
        </BaseEditModal>
    );
}
