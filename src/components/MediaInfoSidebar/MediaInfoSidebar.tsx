import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import InfoSideBarElement from './InfoSidebarElement/InfoSidebarElement';
import RatingSidebarElement from './RatingSidebarElement/RatingSidebarElement';
import TagsSidebarElement from './TagSidebarElement/TagSidebarElement';

import { CategoryInfoRequest } from '../../api/requests/CategoryRequests';
import { ArtistInfoRequest } from '../../api/requests/ArtistRequests';
import { AlbumInfoRequest } from '../../api/requests/AlbumRequests';

import './MediaInfoSidebar.css'
import Media from '../../model/Media';
import MediaSearchQuery from '../../api/requests/RequestBodies/MediaSearchQuery';
import { MediaContext } from '../../MediaContext';
import { ErrorContext } from '../../pages/ErrorContext';
import { MediaInfoChangeRequest } from '../../api/requests/MediaRequests';
import MediaEditRequestBody from '../../api/requests/RequestBodies/MediaEditRequest';

type Props = {
    media: Media,
    setMedia: Function
}

export default function MediaInfoSidebar({media, setMedia}: Props) {

    const [categoryName, setCategoryName] = useState<string | undefined>(undefined);
    const [artistName, setArtistName] = useState<string | undefined>(undefined);
    const [albumName, setAlbumName] = useState<string | undefined>(undefined);

    const history = useHistory();
    const { setQuery } = useContext(MediaContext);
    const { addError } = useContext(ErrorContext);

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

    const onSidebarNavClick = (query: MediaSearchQuery) => {
        setQuery(query);
        history.push('/search');
    }

    const handleScoreEdit = async (newScore: number) => {
        if (media.score !== newScore) {
            await new MediaInfoChangeRequest(media.id, new MediaEditRequestBody({ score : newScore })).send()
                .then(response => setMedia(response))
                .catch(error => addError(error));
        }
    }

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
