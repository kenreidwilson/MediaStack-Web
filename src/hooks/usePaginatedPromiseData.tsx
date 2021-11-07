import { useState, useEffect } from 'react';
import usePagination from './usePagination';
import usePromise from './usePromise';

type PaginatedData<T> = { data: T[], total: number };

type Props<T> = {
    dataPerPage: number,
    getData: (startIndex: number, endIndex: number) => Promise<PaginatedData<T>>,
    initialPageNumber?: number
}

export default function usePaginatedPromiseData<T>({ getData, dataPerPage, initialPageNumber = 1 }: Props<T>) {

    const [totalSize, setTotalSize] = useState<number>(0);

    const { isLoading, error, result, resolve, reset } = usePromise(() => getData(startIndex, endIndex));

    const { currentPage, setPage, totalPages, startIndex, endIndex } = usePagination({ 
        totalItems: totalSize, initialPage: initialPageNumber, pageSize: dataPerPage });

    useEffect(() => {
        resolve();
    }, [currentPage, getData]);

    useEffect(() => {
        if (result !== undefined && result.data.length !== totalSize) {
            setTotalSize(result.total);
        }
    }, [result]);

    return { 
        isLoading: isLoading,
        error: error,
        data: result?.data, 
        totalPages,
        currentPage,
        setPage
    };
}

export type {
    PaginatedData
}
