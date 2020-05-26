import React, { Component } from 'react';

import API from '../api/API';
import { SearchRequest, SearchMediaSetRequest } from '../api/requests/SearchRequests';

class MediaThumbnails extends Component {

    state = {
        mediaSet: this.props.mediaSet,
        searchQuery: this.props.searchQuery,
        media : []
    };

    componentDidMount = () => {
        if (this.state.mediaSet === null) {
            return;
        }
        let request;
        if (this.state.searchQuery === null || this.state.searchQuery.length === 0){
            request = new SearchMediaSetRequest({ set: this.state.mediaSet });
        } else {
            request = new SearchRequest({ set : this.state.mediaSet, query : this.state.searchQuery })
        };
        API.get(request).then(queriedMedia => {
            this.setState({ media : queriedMedia });
        }).catch(error => { 
            alert(error.message);
        });
    }

    render() { 
        return ( 
            <div id="thumbnails">
                {this.state.media.map(media => <MediaThumbnail key={media.hash} data={media}/>)}
            </div>
        );
    }
}

class MediaThumbnail extends Component {
    state = {
        media: this.props.data
    };

    render() {
        let classes = "thumbnail ";
        classes += this.state.media.album == null ? "media_thumbnail" : "album_thumbnail";
        let alt = this.state.media.tags.toString();
        return (
            <a href={`/media?media=${this.state.media.hash}`}>
                <img 
                    alt={alt} 
                    className={classes} 
                    src={`http://localhost:8000/api/media/${this.state.media.hash}/thumbnail`}>
                </img>
            </a>
        );
    }
}
 
export default MediaThumbnails;
