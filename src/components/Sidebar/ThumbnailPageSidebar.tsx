import { MediaSearchQuery } from '../../types';
import { Button, Accordion, Card } from 'react-bootstrap';
import Sidebar from './Sidebar';
import MediaSearchSidebarElement from './Elements/MediaSearchSidebarElement';

type Props = {
    onToggleEditMode?: () => void,
    mediaQuery?: MediaSearchQuery,
    setMediaQuery?: (query: MediaSearchQuery) => void
}

export default function ThumbnailPageSidebar({ 
    onToggleEditMode = () => {}, 
    mediaQuery = {}, 
    setMediaQuery = () => {} }: Props) {

    return (
        <Sidebar width={'auto'}>
            <div>
                <Button style={{ width: '100%' }} onClick={onToggleEditMode} variant='primary'>Toggle Edit Mode</Button>
                <div style={{ marginTop: '5px' }}>
                    <MediaSearchSidebarElement mediaQuery={mediaQuery} setMediaQuery={setMediaQuery} />
                </div>
            </div>
        </Sidebar>
    );
}
