import React, { Component } from 'react';

import InfoSideBarElement from './InfoSidebarElement/InfoSidebarElement';
import RatingSidebarElement from './RatingSidebarElement/RatingSidebarElement';
import TagsSidebarElement from './TagSidebarElement/TagSidebarElement'

import './MediaInfoSidebar.css'

export default class MediaInfoSidebar extends Component {

    render() { 
        return (
            <React.Fragment>
                <div id="media_info">
                    <button onClick={this.props.handleEdit}>Edit</button>
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
                        link={this.props.media.source}/>
                    
                    <RatingSidebarElement 
                        rating={this.props.media.score}
                        handleEdit={this.props.handleScoreEdit}/>

                    <TagsSidebarElement
                        tags={this.props.media.tags}/>
                </div>
            </React.Fragment>
         );
    }
}
