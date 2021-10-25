import { useState } from 'react';

type Props = {
    totalItems: number,
    pageSize: number,
    initialPage?: number
}

export default function usePagination({ totalItems, pageSize, initialPage = 1}: Props) {

    const [currentPage, setCurrentPage] = useState<number>(initialPage);

    const setPage = (pageNumber: number) => setCurrentPage(pageNumber);

    const totalPages = totalItems > 0 ? Math.ceil(totalItems / pageSize) : 0;

    const startIndex: number = (currentPage - 1) * pageSize;

    const endIndex: number = currentPage * pageSize;

    return { currentPage, setPage, totalPages, startIndex, endIndex };
}
