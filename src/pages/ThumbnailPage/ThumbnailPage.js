import React, { Component } from 'react';
import Nav from '../../components/Navigation/Nav';
import MediaThumbnails from '../../components/MediaThumbnails/MediaThumbnails';

import { SearchRequest, SearchAllRequest } from '../../api/requests/SearchRequests';

const ThumbnailPage = () => {
    return (
        <ThumbnailPageComponent />
    );
}

export default class ThumbnailPageComponent extends Component {
    state = { 
        collapseAlbums : false,
        mediaList : []
     }

     componentDidMount = async () => {
        let request;
        if (typeof this.props.location.state === 'undefined') {
            request = new SearchAllRequest();
        } else {
            request = new SearchRequest(this.props.location.state.searchQuery);
        }

        await request.send().then(response => {
            let media = response.media;
            let result = media.concat(response.albums);
            result.sort((a, b) => {
                if (a.category !== b.category) {
                    return a.category > b.category;
                } else if (a.artist !== b.artist) {
                    return a.artist > b.artist;
                } else if (a.album !== b.album) {
                    return a.album > b.album;
                }
                return true;
            });
            this.setState({mediaList : result })
        }).catch(error => { 
            alert(error.message);
        });
    }

    render() { 
        return ( 
            <React.Fragment>
                <Nav />
                {this.state.mediaList.length !== 0 ? <MediaThumbnails collapseAlbums={this.state.collapseAlbums} mediaList={this.state.mediaList}/> : null}
                {this.state.mediaList.length === 0 ? <h2>Nothing was found...</h2> : null}
            </React.Fragment>
         );
    }
}
