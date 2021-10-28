import IMediaSearchQuery from '../../types/IMediaSearchQuery';
import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import MediaSearchForm from '../Forms/MediaSearchForm';
import { Button, Accordion } from 'react-bootstrap';

type Props = {
    onToggleEditMode?: () => void,
    mediaQuery?: IMediaSearchQuery,
    setMediaQuery?: (query: IMediaSearchQuery) => void
}

export default function MediaThumbnailsSidebar({ 
    onToggleEditMode = () => {}, 
    mediaQuery = {}, 
    setMediaQuery = () => {} }: Props) {
    
    return (
        <Sidebar width={'auto'}>
            <div>
                <Button onClick={onToggleEditMode} variant='primary'>Toggle Edit Mode</Button>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Search</Accordion.Header>
                        <Accordion.Body>
                            <MediaSearchForm onChange={setMediaQuery} query={mediaQuery} />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </Sidebar>
    );
}
