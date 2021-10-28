import Media from '../../types/Media';
import IMediaSearchQuery from '../../types/IMediaSearchQuery';
import  { useState, useEffect, useContext } from 'react';
import { ErrorContext } from '../../contexts/ErrorContext';
import useMedia from '../../hooks/useMedia';
import useAlbums from '../../hooks/useAlbums';
import useArtists from '../../hooks/useArtists';
import useCategories from '../../hooks/useCategories';
import useNavigation from '../../hooks/useNavigation';
import List from '@mui/material/List';
import { ListItemButton } from '@mui/material';
import SidebarTagsItem from './Elements/TagSidebarElement';
import SidebarItem from './Elements/SidebarItem';
import SidebarItemButton from './Elements/SidebarItemButton';
import RatingStars from '../Misc/RatingStars';

type Props = {
    media: Media,
    setMedia: Function
}

export default function MediaInfoSidebar({ media, setMedia }: Props) {

    const [categoryName, setCategoryName] = useState<string | undefined>(undefined);
    const [artistName, setArtistName] = useState<string | undefined>(undefined);
    const [albumName, setAlbumName] = useState<string | undefined>(undefined);

    const { addError } = useContext(ErrorContext);
    const { navigate } = useNavigation();

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
        navigate('/search', query);
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
                return 'Image';
            case 2:
                return 'Animated Image';
            case 3:
                return 'Video';
            default:
                return undefined;
        }
    }

    return (
        <List dense sx={{}} >

            {media.type && 
            <SidebarItem header='Type'>
                <SidebarItemButton 
                    onClick={() => onSidebarNavClick({ type: media.type })} 
                    body={`${getTypeBody(media.type)}`}/>
            </SidebarItem>}
            
            {categoryName && 
            <SidebarItem header='Category'>
                <SidebarItemButton onClick={() => onSidebarNavClick({ mode: 2, categoryID: media.categoryID })} body={categoryName}/>
            </SidebarItem>} 

            {artistName && 
            <SidebarItem header='Artist'>
                <SidebarItemButton onClick={() => onSidebarNavClick({ mode: 1, artistID: media.artistID })} body={artistName}/>
            </SidebarItem>}
            
            {albumName && 
            <SidebarItem header='Album'>
                <SidebarItemButton onClick={() => onSidebarNavClick({ mode: 1, albumID: media.albumID })} body={albumName}/>
            </SidebarItem>}

            {media.source && 
            <SidebarItem header='Source'>
                <SidebarItemButton body={`${media.source}`}/>
            </SidebarItem>}

            <SidebarItem header='Rating'>
                <ListItemButton onClick={() => onSidebarNavClick({ score: media.score })}>
                    <RatingStars value={media.score}/>
                </ListItemButton>
            </SidebarItem>

            {media.tags &&
            <SidebarItem header={`Tags (${media.tags.length})`}>
                <SidebarTagsItem onClick={(tag) => onSidebarNavClick({ mode: 2, whitelistTagIDs: [tag.id] })} tags={media.tags}/>
            </SidebarItem>}
        </List>
    );
}
