import IMediaSearchQuery from '../../../types/IMediaSearchQuery';
import { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Button, Accordion, Card } from 'react-bootstrap';
import MediaSearchForm from '../../Forms/MediaSearchForm';

type Props = {
    mediaQuery: IMediaSearchQuery,
    setMediaQuery: (query: IMediaSearchQuery) => void
}

export default function MediaSearchSidebarElement({ mediaQuery, setMediaQuery }: Props) {
    
    const { theme } = useContext(ThemeContext);

    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header style={{ ...theme.style, backgroundColor: 'red', background: 'red'}}>Search</Accordion.Header>
                <Accordion.Body style={theme.style}>
                    <MediaSearchForm onChange={setMediaQuery} query={mediaQuery} />
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}
