import React, { Component } from 'react';

import Nav from '../../components/Navigation/Nav';
import Media from '../../components/Media/Media';
import MediaInfoSidebar from '../../components/MediaInfoSidebar/MediaInfoSidebar';
import SelectableThumbnails from '../../components/SelectableThumbnails/SelectableThumbnails';
import SelectableThumbnailSlider from '../../components/SelectableThumbnailSlider/SelectableThumbnailSlider'

import { AlbumInfoRequest } from '../../api/requests/AlbumRequests'

const AlbumMediaPage = () => {
    return (
        <AlbumMediaPageComponent />
    );
}

export default class AlbumMediaPageComponent extends Component {
    state = { 
        albumInfo : this.props.album,
        mediaNumber : new URL(window.location.href).searchParams.get("page")
    }

    componentDidMount = () => {
        if (this.state.mediaNumber === null) {
            this.setState({ mediaNumber : 0 })
        }
        if (typeof this.state.albumInfo !== 'undefined') {
            return;
        }
        new AlbumInfoRequest(new URL(window.location.href).searchParams.get("album") ).send().then(response => {
            this.setState({ albumInfo : response });
        }).catch(error => { 
            alert(error.message);
        });
    }

    handleMediaInfoUpdate = (mediaInfo) => {
        let newAlbumInfo = this.state.albumInfo;
        newAlbumInfo['album']['media'][this.state.mediaNumber] = mediaInfo;
        this.setState({ albumInfo : newAlbumInfo })
    }

    handleThumbnailClick = (index) => {
        this.setState({ mediaNumber : index });
    }

    handleMediaClick = (event) => {
        if (event.originalEvent.x - event.target.offsetLeft >= event.target.width / 2) {
            this.handleNextMedia();
        } else {
            this.handlePreviousMedia();
        }
    }

    handleNextMedia = () => {
        if (this.state.mediaNumber === this.state.albumInfo['album']['media'].length - 1) {
            this.setState({ mediaNumber : 0 })
        } else {
            this.setState({ mediaNumber : (this.state.mediaNumber + 1) })
        }
    }

    handlePreviousMedia = () => {
        if (this.state.mediaNumber === 0) {
            this.setState({ mediaNumber : this.state.albumInfo['album']['media'].length - 1})
        } else {
            this.setState({ mediaNumber : (this.state.mediaNumber - 1) })
        }
    }

    render() { 
        return ( 
            <React.Fragment>
                <Nav />
                <div id="mediapage">
                    <div id="mediapage-sidebar">
                        {typeof this.state.albumInfo !== 'undefined' && this.state.mediaNumber !== null ? 
                            <MediaInfoSidebar 
                                media={this.state.albumInfo['album']['media'][this.state.mediaNumber]}
                                onMediaInfoChange={this.handleMediaInfoUpdate}/> 
                            : null}
                    </div>
                    <div id="mediapage-content">
                        {typeof this.state.albumInfo !== 'undefined' && this.state.mediaNumber !== null ? 
                            <Media 
                                onImageClick={this.handleMediaClick}
                                media={this.state.albumInfo['album']['media'][this.state.mediaNumber]}
                            />
                        : null}
                        {typeof this.state.albumInfo !== 'undefined' ? 
                            (global.matchMedia(`(min-width: 768px)`).matches ?
                                <SelectableThumbnailSlider 
                                    mediaNumber={this.state.mediaNumber}
                                    onThumbnailClick={this.handleThumbnailClick} 
                                    mediaList={this.state.albumInfo['album']['media']}/>
                                : <div id="thumbnails">
                                        <SelectableThumbnails
                                            mediaNumber={this.state.mediaNumber}
                                            onThumbnailClick={this.handleThumbnailClick} 
                                            mediaList={this.state.albumInfo['album']['media']}/>
                                </div>
                            ) 
                            : null}
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
