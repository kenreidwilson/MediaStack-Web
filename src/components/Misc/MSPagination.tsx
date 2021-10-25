import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Pagination } from 'react-bootstrap';

type Props = {
    pageNumber: number,
    numberOfPages: number,
    onNavigate?: (pageNumber: number) => void;
}

export default function MSPagination({ pageNumber, numberOfPages, onNavigate = () => {} }: Props) {

    const { theme } = useContext(ThemeContext);

    return (
        <Pagination>
            <Pagination.Prev disabled={pageNumber === 1} onClick={() => onNavigate(pageNumber - 1)}/>
                    
            {pageNumber > 3 ? <Pagination.Item key={1} onClick={() => onNavigate(1)}>1</Pagination.Item> : null}
            {pageNumber > 4 ? <Pagination.Ellipsis /> : null}

            {pageNumber - 2 > 0 ? <Pagination.Item key={pageNumber - 2} onClick={() => onNavigate(pageNumber - 2)}>{pageNumber - 2}</Pagination.Item> : null}
            {pageNumber - 1 > 0 ? <Pagination.Item key={pageNumber - 1} onClick={() => onNavigate(pageNumber - 1)}>{pageNumber - 1}</Pagination.Item> : null}
            <Pagination.Item key={pageNumber} active>{pageNumber}</Pagination.Item>
            {pageNumber + 1 <= numberOfPages ? <Pagination.Item key={pageNumber + 1} onClick={() => onNavigate(pageNumber + 1)}>{pageNumber + 1}</Pagination.Item> : null}
            {pageNumber + 2 <= numberOfPages ? <Pagination.Item key={pageNumber + 2} onClick={() => onNavigate(pageNumber + 2)}>{pageNumber + 2}</Pagination.Item> : null}

            {pageNumber + 4 <= numberOfPages ? <Pagination.Ellipsis /> : null}
            {pageNumber + 3 <= numberOfPages ? <Pagination.Item key={numberOfPages} onClick={() => onNavigate(numberOfPages)}>{numberOfPages}</Pagination.Item> : null}

            <Pagination.Next disabled={pageNumber === numberOfPages} onClick={() => onNavigate(pageNumber + 1)}/>
        </Pagination>
    );
}
