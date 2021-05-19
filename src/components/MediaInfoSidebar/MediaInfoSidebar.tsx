import React, { useState, useEffect } from 'react';

import InfoSideBarElement from './InfoSidebarElement/InfoSidebarElement';
import RatingSidebarElement from './RatingSidebarElement/RatingSidebarElement';
import TagsSidebarElement from './TagSidebarElement/TagSidebarElement';

import { CategoryInfoRequest } from '../../api/requests/CategoryRequests';
import { ArtistInfoRequest } from '../../api/requests/ArtistRequests';
import { AlbumInfoRequest } from '../../api/requests/AlbumRequests';

import './MediaInfoSidebar.css'
import Media from '../../model/Media';
import MediaSearchQuery from '../../api/requests/RequestBodies/MediaSearchQuery';

type Props = {
    media: Media,
    onSidebarNavClick: Function,
    handleScoreEdit: Function,
    handleEdit: Function
}

export default function MediaInfoSidebar({media, onSidebarNavClick, handleScoreEdit, handleEdit}: Props) {

    const [categoryName, setCategoryName] = useState<string | undefined>(undefined);
    const [artistName, setArtistName] = useState<string | undefined>(undefined);
    const [albumName, setAlbumName] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (media.categoryID) {
            new CategoryInfoRequest(media.categoryID as number).send().then(response => {
                setCategoryName(response.name);
            });
        } else {
            return;
        }

        if (media.artistID) {
            new ArtistInfoRequest(media.artistID as number).send().then(response => {
                setArtistName(response.name);
            });
        } else {
            return;
        }

        if (media.albumID) {
            new AlbumInfoRequest(media.albumID as number).send().then(response => {
                setAlbumName(response.name);
            });
        }
    }, []);

    return (
        <div id="media_info">
            <p id="media_info_title">{`Media Info  `}</p>
            <InfoSideBarElement 
                label={"Type: "} 
                value={media.type}
                onClick={() => onSidebarNavClick(new MediaSearchQuery({type: media.type}))}/>
            
            <InfoSideBarElement 
                label={"Category: "} 
                value={categoryName}
                onClick={() => onSidebarNavClick(new MediaSearchQuery({categoryID: media.categoryID}))}/>

            <InfoSideBarElement 
                label={"Artist: "} 
                value={artistName}
                onClick={() => onSidebarNavClick(new MediaSearchQuery({artistID: media.artistID}))}/>

            <InfoSideBarElement 
                label={"Album: "} 
                value={albumName}
                onClick={() => onSidebarNavClick(new MediaSearchQuery({albumID: media.albumID}))}/>

            <InfoSideBarElement 
                label={"Source: "} 
                value={media.source}
                onClick={() => console.log("NOT IMPLEMENTED")}/>
            
            <RatingSidebarElement 
                rating={media.score}
                handleEdit={handleScoreEdit}/>

            <TagsSidebarElement
                tags={media.tags}
                onClick={(tagID: number) => onSidebarNavClick(new MediaSearchQuery({whitelistTagIDs: [tagID]}))}/>
        </div>
 );
}
