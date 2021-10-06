import React, { useContext } from 'react';
import RatingSidebarElement from './RatingSidebarElement';
import Media from '../types/Media';
import Album from '../types/Album';
import Tag from '../types/Tag';
import { useHistory } from 'react-router-dom';
import { MediaContext } from '../MediaContext';
import { ErrorContext } from '../pages/ErrorContext';
import './InfoSidebar.css';
import { IMediaSearchQuery } from '../repositories/MediaRepository';
import { AlbumRepository } from '../repositories/AlbumRepository';
import TagsSidebarElement from './TagSidebarElement';

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
        await new AlbumRepository().update({ ID: album.id, 'score' : score})
            .then(() => updateMediaList(album)).catch(error => addError(error));
    }

    return ( 
        <React.Fragment>
            <div id="media_info">
                <p id="media_info_title">{`Album Info  `}</p>
                <RatingSidebarElement 
                    rating={getAlbumScore()}
                    handleEdit={handleScoreEdit}/>
                <TagsSidebarElement
                    tags={getAlbumTags()}
                    onClick={(tagId: number) => onSidebarNavClick({whitelistTagIDs: [tagId]})}/>
            </div>
        </React.Fragment>
     );
}
