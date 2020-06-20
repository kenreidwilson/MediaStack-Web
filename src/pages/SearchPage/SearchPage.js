import React, { Component } from 'react';
import Nav from '../../components/Navigation/Nav';
import MediaThumbnails from '../../components/MediaThumbnails/MediaThumbnails';

import { SearchRequest, SearchMediaSetRequest } from '../../api/requests/SearchRequests';

const SearchPage = () => {
    return (
        <SearchPageComponent />
    );
}

export default class SearchPageComponent extends Component {
    state = { 
        mediaSet : "general",
        searchQuery : new URL(window.location.href).searchParams.get("query"),
        mediaList : null
     }

     componentDidMount = () => {
        if (this.state.mediaSet === null) {
            return;
        }
        let request;
        if (this.state.searchQuery === null || this.state.searchQuery.length === 0){
            request = new SearchMediaSetRequest(this.state.mediaSet);
        } else {
            request = new SearchRequest(this.state.mediaSet, this.state.searchQuery);
        };
        request.send().then(queriedMedia => {
            this.setState({ mediaList : queriedMedia });
        }).catch(error => { 
            alert(error.message);
        });
    }

    render() { 
        return ( 
            <React.Fragment>
                <Nav />
                {this.state.mediaList !== null ? <MediaThumbnails mediaList={this.state.mediaList}/> : null }
            </React.Fragment>
         );
    }
}
