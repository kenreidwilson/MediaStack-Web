import IMediaSearchQuery from '../../types/IMediaSearchQuery';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../Sidebar/Sidebar';
import ToggleableSidebar from '../Sidebar/ToggleableSidebar';
import MediaSearchForm from '../Forms/MediaSearchForm';

type Props = {
    onSearchQueryClick?: (e?: React.MouseEvent) => void,
    onEditClick?: (e?: React.MouseEvent) => void
}

export default function MediaThumbnailsSidebar({ onSearchQueryClick, onEditClick }: Props) {
    
    return (
        <Sidebar width={'auto'}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <FontAwesomeIcon onClick={onSearchQueryClick} style={{fontSize: 50}} icon={faSearch}/>
                <FontAwesomeIcon onClick={onEditClick} style={{fontSize: 50}} icon={faEdit}/>
            </div>
        </Sidebar>
    );
}
