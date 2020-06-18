import React, { Component } from 'react';
import Nav from '../../components/Navigation/Nav';
import Media from '../../components/Media/Media';
import MediaInfoSidebar from '../../components/MediaInfoSidebar/MediaInfoSidebar'

import API from '../../api/API'
import { MediaInfoRequest } from '../../api/requests/MediaRequests'

import './MediaPage.css'

const MediaPage = () => {
    return <MediaPageComponent />;
}

export default class MediaPageComponent extends Component {
    state = {
        mediaInfo : null
    }

    handleMediaInfoUpdate = (newMediaInfo) => {
        this.setState({ mediaInfo : newMediaInfo })
    }

    componentDidMount = () => {
        API.get(new MediaInfoRequest({ mediaId : new URL(window.location.href).searchParams.get("media") })).then(response => {
            this.setState({ mediaInfo : response['media'] });
        }).catch(error => { 
            alert(error.message);
        });
    }

    render() {
        return ( 
            <React.Fragment>
                <Nav />
                <div id="mediapage">
                    <div id="mediapage-sidebar">
                        {this.state.mediaInfo !== null ? <MediaInfoSidebar media={this.state.mediaInfo} onMediaInfoChange={this.handleMediaInfoUpdate}/> : null}
                    </div>
                    <div id="mediapage-content">
                        {this.state.mediaInfo !== null ? <Media media={this.state.mediaInfo}/> : null}
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
