import React, { useContext } from 'react';
import RatingSidebarElement from './RatingSidebarElement/RatingSidebarElement';
import TagsSidebarElement from './TagSidebarElement/TagSidebarElement';
import Media from '../../model/Media';
import Album from '../../model/Album';
import MediaSearchQuery from '../../api/requests/RequestBodies/MediaSearchQuery';
import Tag from '../../model/Tag';
import { useHistory } from 'react-router-dom';
import { MediaContext } from '../../MediaContext';
import { ErrorContext } from '../../pages/ErrorContext';
import { AlbumInfoChangeRequest } from '../../api/requests/AlbumRequests';
import './MediaInfoSidebar.css';
import { SearchRequest } from '../../api/requests/SearchRequests';

type Props = {
    album: Album,
    setAlbum: Function,
    mediaList: Media[],
    setMedialist: Function
}

export default function AlbumInfoSidebar({album, setAlbum, mediaList, setMedialist }: Props) {

    const history = useHistory();
    const { setQuery } = useContext(MediaContext);
    const { addError } = useContext(ErrorContext);

    const onSidebarNavClick = (query: MediaSearchQuery) => {
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
        await new AlbumInfoChangeRequest(album.id, {'score' : score}).send()
            .then(() => {
                new SearchRequest(new MediaSearchQuery({albumID: album.id})).send()
                    .then(response => {setMedialist(response); console.log("REFRESHING")})
                    .catch(error => addError(error));
            }).catch(error => addError(error));
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
                    onClick={(tagId: number) => onSidebarNavClick(new MediaSearchQuery({whitelistTagIDs: [tagId]}))}/>
            </div>
        </React.Fragment>
     );
}
