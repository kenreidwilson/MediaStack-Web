import { useState, useEffect } from 'react';
import usePagination from './usePagination';
import ISearchResponse from '../types/ISearchResponse';
import usePromise from './usePromise';

type Props<T> = {
    dataPerPage: number,
    getData: (startIndex: number, endIndex: number) => Promise<ISearchResponse<T>>
}

export default function usePaginatedPromiseData<T>({ getData, dataPerPage }: Props<T>) {

    const [totalSize, setTotalSize] = useState<number>(0);

    const { isLoading, error, result, resolve, reset } = usePromise(() => getData(startIndex, endIndex));

    const { currentPage, setPage, totalPages, startIndex, endIndex } = usePagination({ 
        totalItems: totalSize, initialPage: 1, pageSize: dataPerPage });

    useEffect(() => {
        resolve();
    }, [currentPage, getData]);

    useEffect(() => {
        if (result !== undefined && result.count !== totalSize) {
            setTotalSize(result.total);
        }
    }, [result]);

    return { 
        isLoading: isLoading,
        error: error,
        data: result, 
        totalPages,
        currentPage,
        setPage
    };
}
