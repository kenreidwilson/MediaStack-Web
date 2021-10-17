import  { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Media from '../types/Media';
import { ErrorContext } from '../contexts/ErrorContext';
import { MediaContext } from '../contexts/MediaContext';

import List from '@mui/material/List';
import SidebarTagsItem from './TagSidebarElement';
import SidebarItem from './SidebarItem';
import SidebarItemButton from './SidebarItemButton';
import useCategories from '../hooks/useCategories';
import useArtists from '../hooks/useArtists';
import useAlbums from '../hooks/useAlbums';
import { IMediaSearchQuery } from '../repositories/MediaRepository';
import { useMedia } from '../hooks/useMedia';
import RatingStars from './RatingStars';
import { ListItemButton } from '@mui/material';

type Props = {
    media: Media,
    setMedia: Function
}

export default function MediaInfoSidebar({ media, setMedia }: Props) {

    const [categoryName, setCategoryName] = useState<string | undefined>(undefined);
    const [artistName, setArtistName] = useState<string | undefined>(undefined);
    const [albumName, setAlbumName] = useState<string | undefined>(undefined);

    const history = useHistory();
    const { setQuery } = useContext(MediaContext);
    const { addError } = useContext(ErrorContext);

    const { get: getCategory } = useCategories();
    const { get: getArtist } = useArtists();
    const { get: getAlbum } = useAlbums();
    const { update: updateMedia } = useMedia();

    useEffect(() => {
        if (media.categoryID) {
            getCategory(media.categoryID).then(response => {
                setCategoryName(response.name);
            });
        } else {
            return;
        }

        if (media.artistID) {
            getArtist(media.artistID).then(response => {
                setArtistName(response.name);
            });
        } else {
            return;
        }

        if (media.albumID) {
            getAlbum(media.albumID).then(response => {
                setAlbumName(response.name);
            });
        }
    }, [media]);

    const onSidebarNavClick = (query: IMediaSearchQuery) => {
        setQuery(query);
        history.push('/search');
    }

    const handleScoreEdit = async (newScore: number) => {
        if (media.score !== newScore) {
            await updateMedia({ ID: media.id, score : newScore })
                .then(response => setMedia(response))
                .catch(error => addError(error));
        }
    }

    const getTypeBody = (type: number): string | undefined => {
        switch (type) {
            case 1:
                return "Image";
            case 2:
                return "Animated Image";
            case 3:
                return "Video";
            default:
                return undefined;
        }
    }

    return (
        <List dense sx={{}} >

            {media.type && 
            <SidebarItem header="Type">
                <SidebarItemButton body={`${getTypeBody(media.type)}`}/>
            </SidebarItem>}
            
            {categoryName && 
            <SidebarItem header="Category">
                <SidebarItemButton body={categoryName}/>
            </SidebarItem>} 

            {artistName && 
            <SidebarItem header="Artist">
                <SidebarItemButton body={artistName}/>
            </SidebarItem>}
            
            {albumName && 
            <SidebarItem header="Album">
                <SidebarItemButton body={albumName}/>
            </SidebarItem>}

            {media.source && 
            <SidebarItem header="Source">
                <SidebarItemButton body={`${media.source}`}/>
            </SidebarItem>}

            <SidebarItem header="Rating">
                <ListItemButton>
                    <RatingStars value={media.score}/>
                </ListItemButton>
            </SidebarItem>

            {media.tags &&
            <SidebarItem header={`Tags (${media.tags.length})`}>
                <SidebarTagsItem tags={media.tags}/>
            </SidebarItem>}
        </List>
    );
}
