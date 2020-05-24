import React, { Component } from 'react';
import MediaImage from './MediaImage';
import MediaVideo from './MediaVideo';
import MediaInfoSidebar from './MediaInfoSidebar';

class Media extends Component {
    state = {
        mediaHash : this.props.mediaHash,
        data : null
    };

    componentDidMount = () => {
        if (this.state.mediaHash === null) {
            return null;
        }
        fetch(`http://localhost:8000/api/media/${this.state.mediaHash}/info`)
        .then(response => response.json())
        .then(data => {
            this.setState({ data : data['data']})
        });
    }
    
    getMediaComponent = () => {
        switch(this.state.data.media.type) {
            case "image":
                return <MediaImage mediaData={this.state.data.media}/>;
            case "animated_image":
                return <MediaImage mediaData={this.state.data.media}/>;
            case "video":
                return <MediaVideo mediaData={this.state.data.media}/>;
            default:
                return null;
        }
    }

    render() { 
        if (this.state.data === null){
            return null;
        }
        return (
            <div>
                <MediaInfoSidebar mediaData={this.state.data.media}/>
                <div id="media">
                    {this.state.data.next_media === null ? 
                        this.getMediaComponent() :
                        <a href={`/media?media=${this.state.data.next_media}`}> {this.getMediaComponent()} </a>}
                </div>
            </div>
        );
    }
}
 
export default Media;
