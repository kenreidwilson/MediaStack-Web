import { useContext, useEffect } from 'react';
import { ErrorContext } from '../../contexts/ErrorContext';
import usePaginatedPromiseData, { PaginatedData } from '../../hooks/usePaginatedPromiseData';
import AttributeTable from './AttributeTable';
import MSPagination from '../Misc/MSPagination';

type Attribute = { id: number, name: string };

type Props<T> = {
    loadMore: (start: number, end: number) => Promise<PaginatedData<T>>,
    onAttributeClick?: (attribute: T) => void,
    onAttributeEdit?: (attribute: T) => void,
    onAttributeDelete?: (attribute: T) => void
};

export default function PaginatedAttributeTable<T extends Attribute>({
    loadMore,
    onAttributeClick,
    onAttributeEdit,
    onAttributeDelete
}: Props<T>) {

    const { addError } = useContext(ErrorContext);

    const { isLoading, error, data, totalPages, currentPage, setPage } = 
        usePaginatedPromiseData({ getData: loadMore, dataPerPage: 10 });

    useEffect(() => {
        if (error !== undefined) {
            addError(error);
        }
    }, [error]);

    return (
        isLoading || data === undefined ? 
            <p>Loading...</p> : 
            <>
                <AttributeTable 
                    attributeObjects={data} 
                    onAttributeClick={onAttributeClick} 
                    onAttributeDelete={onAttributeEdit} 
                    onAttributeEdit={onAttributeDelete}/>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <MSPagination 
                        pageNumber={currentPage} 
                        numberOfPages={totalPages}
                        onNavigate={setPage}/>
                </div>
            </>
    );
}
