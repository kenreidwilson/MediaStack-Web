import { Media, Album, Tag, MediaSearchQuery } from '../../types';
import useNavigation from '../../hooks/useNavigation';
import { List, ListItemButton } from '@mui/material';
import RatingStars from '../Misc/RatingStars';
import SidebarItem from './Elements/SidebarItem';
import SidebarTagsItem from './Elements/TagSidebarElement';

type Props = {
    album: Album,
    mediaList: Media[]
}

export default function AlbumInfoSidebar({album, mediaList }: Props) {

    const { navigate } = useNavigation();

    const onSidebarNavClick = (query: MediaSearchQuery) => {
        navigate({ name: 'search', data: query });
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

    return ( 
        <List dense>
            <SidebarItem header='Rating'>
                <ListItemButton>
                    <RatingStars value={getAlbumScore()} onChange={() => onSidebarNavClick({ score: getAlbumScore() })}/>
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
