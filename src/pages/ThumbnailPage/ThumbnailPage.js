import React, { Component } from 'react';

import Navigation from '../../components/Navigation/Nav';
import MediaThumbnails from '../../components/MediaThumbnails/MediaThumbnails';
import BannerAlert from '../../components/BannerAlert/BannerAlert';

import { CategoriesRequest } from '../../api/requests/CategoryRequests';
import { ArtistsRequest } from '../../api/requests/ArtistRequests';
import { AlbumsRequest } from '../../api/requests/AlbumRequests';
import { SearchRequest, SearchAllRequest } from '../../api/requests/SearchRequests';

const ThumbnailPage = () => {
    return (
        <ThumbnailPageComponent />
    );
}

export default class ThumbnailPageComponent extends Component {
    state = { 
        collapseAlbums : true,
        mediaList : null,
        alerts : []
    }

    addAlert = (alert) => {
        let alerts = this.state.alerts.concat(alert);
        this.setState({ alerts })
    }

    componentDidMount = async () => {
        
        let request;
        if (typeof this.props.location.state === 'undefined') {
            request = new SearchAllRequest();
        } else {
            request = new SearchRequest(this.props.location.state.searchQuery);
        }

        await request.send().then(response => {
            if (response.data === 0) {
                this.addAlert(<BannerAlert variant="warning" heading="API Response:" body="Nothing was found."/>);
            }
            this.setState({mediaList : response });
        }).catch(error => { 
            this.addAlert(<BannerAlert variant="danger" heading="API Error: " body={error.message}/>);
        });
    }

    render() { 
        return ( 
            <React.Fragment>
                <Navigation />
                {this.state.alerts.map(errorComponent => errorComponent)}
                {this.state.mediaList ? 
                    <MediaThumbnails 
                        mediaList={this.state.mediaList}/> 
                : null}
            </React.Fragment>
         );
    }
}
