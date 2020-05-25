import React, { Component } from 'react';
import MediaThumbnail from './MediaThumbnail';

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
            switch(error.name) {
                case ("APINetworkError"):
                    alert("Failed to connect to API.");
                    break;
                case ("APINotFoundError"):
                    alert("MediaSet not found.");
                    break;
                default:
                    alert(error.message);
                    break;
            }
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
 
export default MediaThumbnails;
