import { useContext } from 'react';
import RatingSidebarElement from './RatingSidebarElement';
import Media from '../types/Media';
import Album from '../types/Album';
import Tag from '../types/Tag';
import { useHistory } from 'react-router-dom';
import { ErrorContext } from '../contexts/ErrorContext';
import './InfoSidebar.css';
import { IMediaSearchQuery } from '../repositories/MediaRepository';
import { AlbumRepository } from '../repositories/AlbumRepository';
import SidebarTagsItem from './TagSidebarElement';
import { MediaContext } from '../contexts/MediaContext';
import { List, ListItemButton } from '@mui/material';
import SidebarItem from './SidebarItem';
import useAlbums from '../hooks/useAlbums';
import RatingStars from './RatingStars';

type Props = {
    album: Album,
    setAlbum: Function,
    mediaList: Media[],
    updateMediaList: Function
}

export default function AlbumInfoSidebar({album, setAlbum, mediaList, updateMediaList }: Props) {

    const history = useHistory();
    const { setQuery } = useContext(MediaContext);
    const { addError } = useContext(ErrorContext);

    const { update } = useAlbums();

    const onSidebarNavClick = (query: IMediaSearchQuery) => {
        setQuery(query);
        history.push('/search');
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
            <SidebarItem header="Rating">
                <ListItemButton>
                    <RatingStars value={getAlbumScore()} onChange={handleScoreEdit}/>
                </ListItemButton>
            </SidebarItem>
            <SidebarItem header="Tags">
                <SidebarTagsItem
                        tags={getAlbumTags()}
                        onClick={(tag) => onSidebarNavClick({whitelistTagIDs: [tag.id]})}/>
            </SidebarItem>
        </List>
     );
}
