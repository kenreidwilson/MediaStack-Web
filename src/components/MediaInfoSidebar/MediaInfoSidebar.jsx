import React, { Component } from 'react';
import { MediaChangeSourceRequest, MediaChangeScoreRequest, MediaAddTagRequest, MediaDeleteTagRequest } from '../../api/requests/MediaRequests'
import API from '../../api/API';
import InfoSideBarElement from './InfoSidebarElement/InfoSidebarElement';
import RatingSidebarElement from './RatingSidebarElement/RatingSidebarElement';
import TagsSidebarElement from './TagSidebarElement/TagSidebarElement';

import './MediaInfoSidebar.css'

export default class MediaInfoSidebar extends Component {
    
    handleSourceEdit = (newSource) => {
        API.put(new MediaChangeSourceRequest(
            { 
                hash : this.props.media.hash, 
                source : newSource
            })
        ).then(response => this.props.onMediaInfoChange(response))
    }

    handleScoreEdit = (newScore) => {
        API.put(new MediaChangeScoreRequest(
            {
                hash : this.props.media.hash,
                score : newScore
            }
        )).then(response => this.props.onMediaInfoChange(response))
    }

    handleTagDelete = (tag) => {
        API.delete(new MediaDeleteTagRequest(
            {
                hash : this.props.media.hash,
                tag : tag
            }
        )).then(response => this.props.onMediaInfoChange(response))
    }

    handleTagAdd = (tag) => {
        API.post(new MediaAddTagRequest(
            {
                hash : this.props.media.hash,
                tag : tag
            }
        )).then(response => this.props.onMediaInfoChange(response))
    }

    render() { 
        return (
            <div id="media_info">
                <InfoSideBarElement 
                    label={"Type: "} 
                    value={this.props.media.type}
                    link={`/search?query=type:${this.props.media.type}`}/>
                
                <InfoSideBarElement 
                    label={"Category: "} 
                    value={this.props.media.category}
                    link={`/search?query=category:${this.props.media.category}`}/>

                <InfoSideBarElement 
                    label={"Artist: "} 
                    value={this.props.media.artist}
                    link={`/search?query=artist:${this.props.media.artist}`}/>

                <InfoSideBarElement 
                    label={"Album: "} 
                    value={this.props.media.album}
                    link={`/search?query=album:${this.props.media.album}`}/>

                <InfoSideBarElement 
                    label={"Source: "} 
                    value={this.props.media.source}
                    link={this.props.media.source}
                    handleEdit={this.handleSourceEdit}/>
                
                <RatingSidebarElement 
                    rating={this.props.media.score}
                    handleEdit={this.handleScoreEdit}/>

                <TagsSidebarElement
                    tags={this.props.media.tags}
                    handleTagAdd={this.handleTagAdd}
                    handleTagDelete={this.handleTagDelete}/>
            </div>
         );
    }
}
