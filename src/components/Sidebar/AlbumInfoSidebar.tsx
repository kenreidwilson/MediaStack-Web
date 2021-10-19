import Media from '../../types/Media';
import Album from '../../types/Album';
import Tag from '../../types/Tag';
import IMediaSearchQuery from '../../types/IMediaSearchQuery';
import { useContext } from 'react';
import { ErrorContext } from '../../contexts/ErrorContext';
import useAlbums from '../../hooks/useAlbums';
import useNavigation from '../../hooks/useNavigation';
import { List, ListItemButton } from '@mui/material';
import RatingStars from '../Misc/RatingStars';
import SidebarItem from './SidebarItem';
import SidebarTagsItem from './TagSidebarElement';

type Props = {
    album: Album,
    setAlbum: Function,
    mediaList: Media[],
    updateMediaList: Function
}

export default function AlbumInfoSidebar({album, setAlbum, mediaList, updateMediaList }: Props) {

    const { addError } = useContext(ErrorContext);
    const { update } = useAlbums();
    const { navigate } = useNavigation();

    const onSidebarNavClick = (query: IMediaSearchQuery) => {
        navigate('search', query);
    }

    const getAlbumScore = () => {
        let score = 0;
        mediaList.forEach(media => {
            score += media.score;
        })
        return score === 0 ? 0 : Math.round(score / mediaList.length);
    }

    const getAlbumTags = () => {
        let tags: Tag[] = [];

        mediaList.forEach(media => {
            media.tags.forEach(tag => {
                if (!tags.find(t => t.id === tag.id)) {
                    tags.push(tag);
                }
            });
        });

        return tags;
    }

    const handleScoreEdit = async (newScore: number) => {
        let score = newScore === getAlbumScore() ? 0 : newScore;
        await update({ ID: album.id, score}) 
            .then(() => updateMediaList(album)).catch(error => addError(error));
    }

    return ( 
        <List dense>
            <SidebarItem header='Rating'>
                <ListItemButton>
                    <RatingStars value={getAlbumScore()} onChange={handleScoreEdit}/>
                </ListItemButton>
            </SidebarItem>
            <SidebarItem header='Tags'>
                <SidebarTagsItem
                        tags={getAlbumTags()}
                        onClick={(tag) => onSidebarNavClick({whitelistTagIDs: [tag.id]})}/>
            </SidebarItem>
        </List>
     );
}
