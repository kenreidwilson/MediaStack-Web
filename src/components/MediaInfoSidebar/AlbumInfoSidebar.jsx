import React, { Component } from 'react';

import RatingSidebarElement from './RatingSidebarElement/RatingSidebarElement';
import TagsSidebarElement from './TagSidebarElement/TagSidebarElement';

import './MediaInfoSidebar.css'

export default class AlbumInfoSidebar extends Component {

    onTagClick = (tagId) => {
        this.props.onSidebarNavClick({'whitelist_tags':[tagId]});
    }

    getAlbumScore = () => {
        let score = 0;
        this.props.album.media.forEach(media => {
            score += media.score;
        })
        return score === 0 ? 0 : Math.round(score / this.props.album.media.length);
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
                        tags={this.props.album.tags}
                        onClick={this.onTagClick}/>
                </div>
            </React.Fragment>
         );
    }
}
