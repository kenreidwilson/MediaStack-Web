import React, { Component } from 'react';

import InfoSideBarElement from './InfoSidebarElement/InfoSidebarElement';
import RatingSidebarElement from './RatingSidebarElement/RatingSidebarElement';
import TagsSidebarElement from './TagSidebarElement/TagSidebarElement';

import { CategoryInfoRequest } from '../../api/requests/CategoryRequests';
import { ArtistInfoRequest } from '../../api/requests/ArtistRequests';
import { AlbumInfoRequest } from '../../api/requests/AlbumRequests';

import './MediaInfoSidebar.css'
import Media from '../../model/Media';
import MediaSearchQuery from '../../api/requests/RequestBodies/MediaSearchQuery';

type Props = {
    media: Media,
    onSidebarNavClick: Function,
    handleScoreEdit: Function,
    handleEdit: Function
}

export default class MediaInfoSidebar extends Component<Props> {

    state = {
        categoryName : null,
        artistName : null,
        albumName : null
    }

    componentDidMount = async () => {
        let categoryName = null;
        let artistName = null;
        let albumName = null;

        if (this.props.media.categoryID !== null) {
            await new CategoryInfoRequest(this.props.media.categoryID as number).send().then(response => {
                categoryName = response.name;
            });
        }
        
        if (this.props.media.artistID !== null) {
            await new ArtistInfoRequest(this.props.media.artistID as number).send().then(response => {
                artistName = response.name;
            });
        }
        
        if (this.props.media.albumID !== null) {
            await new AlbumInfoRequest(this.props.media.albumID as number).send().then(response => {
                albumName = response.name;
            });
        }
        
        this.setState({ categoryName, artistName, albumName });
    }

    onTypeClick = () => {
        this.props.onSidebarNavClick(new MediaSearchQuery({type: this.props.media.type}));
    }

    onCategoryClick = () => {
        this.props.onSidebarNavClick(new MediaSearchQuery({categoryID: this.props.media.categoryID}));
    }

    onArtistClick = () => {
        this.props.onSidebarNavClick(new MediaSearchQuery({artistID: this.props.media.artistID}));
    }

    onAlbumClick = () => {
        this.props.onSidebarNavClick(new MediaSearchQuery({albumID: this.props.media.albumID}));
    }

    onSourceClick = () => {

    }

    onTagClick = (tagId: number) => {
        this.props.onSidebarNavClick(new MediaSearchQuery({whitelistTagIDs: [tagId]}));
    }

    render() { 
        return (
                <div id="media_info">
                    <p id="media_info_title">{`Media Info  `}</p>
                    <InfoSideBarElement 
                        label={"Type: "} 
                        value={this.props.media.type}
                        onClick={this.onTypeClick}/>
                    
                    <InfoSideBarElement 
                        label={"Category: "} 
                        value={this.state.categoryName}
                        onClick={this.onCategoryClick}/>

                    <InfoSideBarElement 
                        label={"Artist: "} 
                        value={this.state.artistName}
                        onClick={this.onArtistClick}/>

                    <InfoSideBarElement 
                        label={"Album: "} 
                        value={this.state.albumName}
                        onClick={this.onAlbumClick}/>

                    <InfoSideBarElement 
                        label={"Source: "} 
                        value={this.props.media.source}
                        onClick={this.onSourceClick}/>
                    
                    <RatingSidebarElement 
                        rating={this.props.media.score}
                        handleEdit={this.props.handleScoreEdit}/>

                    <TagsSidebarElement
                        tags={this.props.media.tags}
                        onClick={this.onTagClick}/>
                </div>
         );
    }
}
