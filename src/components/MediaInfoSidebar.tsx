import  { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import InfoSideBarElement from './InfoSidebarElement';
import RatingSidebarElement from './RatingSidebarElement';

import './InfoSidebar.css'
import Media from '../types/Media';
import { ErrorContext } from '../contexts/ErrorContext';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { ArtistRepository } from '../repositories/AritstRepository';
import { IMediaSearchQuery, MediaRepository } from '../repositories/MediaRepository';
import { AlbumRepository } from '../repositories/AlbumRepository';
import TagsSidebarElement from './TagSidebarElement';
import { MediaContext } from '../contexts/MediaContext';

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
    const categories = new CategoryRepository();
    const artists = new ArtistRepository();

    useEffect(() => {
        if (media.categoryID) {
            categories.get(media.categoryID).then(response => {
                setCategoryName(response.name);
            });
        } else {
            return;
        }

        if (media.artistID) {
            artists.get(media.artistID).then(response => {
                setArtistName(response.name);
            });
        } else {
            return;
        }

        if (media.albumID) {
            new AlbumRepository().get(media.albumID).then(response => {
                setAlbumName(response.name);
            });
        }
    }, []);

    const onSidebarNavClick = (query: IMediaSearchQuery) => {
        setQuery(query);
        history.push('/search');
    }

    const handleScoreEdit = async (newScore: number) => {
        if (media.score !== newScore) {
            await new MediaRepository().update({ ID: media.id, score : newScore })
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
                onClick={() => onSidebarNavClick({type: media.type})}/>
            
            <InfoSideBarElement 
                label={"Category: "} 
                value={categoryName}
                onClick={() => onSidebarNavClick({categoryID: media.categoryID})}/>

            <InfoSideBarElement 
                label={"Artist: "} 
                value={artistName}
                onClick={() => onSidebarNavClick({artistID: media.artistID})}/>

            <InfoSideBarElement 
                label={"Album: "} 
                value={albumName}
                onClick={() => onSidebarNavClick({albumID: media.albumID})}/>

            <InfoSideBarElement 
                label={"Source: "} 
                value={media.source}
                onClick={() => console.log("NOT IMPLEMENTED")}/>
            
            <RatingSidebarElement 
                rating={media.score}
                handleEdit={handleScoreEdit}/>

            <TagsSidebarElement
                tags={media.tags}
                onClick={(tagID: number) => onSidebarNavClick({whitelistTagIDs: [tagID]})}/>
        </div>
    );
}
