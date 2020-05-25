import React, { Component } from 'react';
import API from '../api/API'
import { MediaInfoRequest } from '../api/requests/MediaRequests'
import MediaImage from './MediaImage';
import MediaVideo from './MediaVideo';
import MediaInfoSidebar from './MediaInfoSidebar';

class Media extends Component {
    state = {
        mediaHash : this.props.mediaHash,
        media : null
    };

    componentDidMount = () => {
        if (this.state.mediaHash === null) {
            return null;
        }
        API.get(new MediaInfoRequest({ hash : this.state.mediaHash })).then(mediaInfo => {
            this.setState({ media : mediaInfo})
        }).catch(error => { 
            switch(error.name) {
                case ("APINetworkError"):
                    alert("Failed to connect to API.");
                    break;
                case ("APINotFoundError"):
                    alert("Media not found.");
                    break;
                default:
                    alert(error.message);
                    break;
            }
        });
    }
    
    getMediaComponent = () => {
        switch(this.state.media.media.type) {
            case "image":
                return <MediaImage mediaData={this.state.media.media}/>;
            case "animated_image":
                return <MediaImage mediaData={this.state.media.media}/>;
            case "video":
                return <MediaVideo mediaData={this.state.media.media}/>;
            default:
                return null;
        }
    }

    render() { 
        if (this.state.media === null) {
            return null;
        }
        return (
            <div>
                <MediaInfoSidebar mediaData={this.state.media.media}/>
                <div id="media">
                    {this.state.media.next_media === null ? 
                        <a> {this.getMediaComponent()} </a> :
                        <a href={`/media?media=${this.state.media.next_media}`}> {this.getMediaComponent()} </a>}
                </div>
            </div>
        );
    }
}
 
export default Media;
