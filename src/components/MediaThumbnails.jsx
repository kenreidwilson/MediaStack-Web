import React, { Component } from 'react';
import MediaThumbnail from './MediaThumbnail'

class MediaThumbnails extends Component {

    state = {
        mediaSet: this.props.mediaSet,
        searchQuery: this.props.searchQuery,
        mediasData : []
    };

    componentDidMount = () => {
        if (this.state.mediaSet === null) {
            return;
        }
        var query;
        if (this.state.searchQuery === null || this.state.searchQuery.length === 0){
            query = 'http://localhost:8000/api/search/' + this.state.mediaSet;
        } else {
            query = 'http://localhost:8000/api/search/' + this.state.mediaSet + '/' + this.state.searchQuery;
        };
        fetch(query)
        .then(response => response.json())
        .then(data => {
            this.setState({ mediasData: data['data'] })
        });
    }

    render() { 
        return ( 
            <div id="thumbnails">
                {this.state.mediasData.map(media => <MediaThumbnail key={media.hash} data={media}/>)}
            </div>
        );
    }
}
 
export default MediaThumbnails;
