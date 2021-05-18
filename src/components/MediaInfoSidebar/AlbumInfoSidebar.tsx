import React, { Component } from 'react';

import RatingSidebarElement from './RatingSidebarElement/RatingSidebarElement';
import TagsSidebarElement from './TagSidebarElement/TagSidebarElement';

import './MediaInfoSidebar.css'
import Media from '../../model/Media';
import Album from '../../model/Album';
import MediaSearchQuery from '../../api/requests/RequestModels/MediaSearchQuery';
import Tag from '../../model/Tag';

type Props = {
    album: Album,
    mediaList: Media[],
    onSidebarNavClick: Function,
    handleScoreEdit: Function,
    handleEdit: Function
}

export default class AlbumInfoSidebar extends Component<Props> {

    onTagClick = (tagId: number) => {
        this.props.onSidebarNavClick(new MediaSearchQuery({whitelistTagIDs: [tagId]}));
    }

    getAlbumScore = () => {
        let score = 0;
        this.props.mediaList.forEach(media => {
            score += media.score;
        })
        return score === 0 ? 0 : Math.round(score / this.props.mediaList.length);
    }

    getAlbumTags = () => {
        // TODO: Implement
        return Array<Tag>();
    }

    render() { 
        return ( 
            <React.Fragment>
                <div id="media_info">
                    <p id="media_info_title">{`Album Info  `}</p>
                    <RatingSidebarElement 
                        rating={this.getAlbumScore()}
                        handleEdit={this.props.handleScoreEdit}/>

                    <TagsSidebarElement
                        tags={this.getAlbumTags()}
                        onClick={this.onTagClick}/>
                </div>
            </React.Fragment>
         );
    }
}
