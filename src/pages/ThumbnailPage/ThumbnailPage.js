import React, { Component } from 'react';

import Navigation from '../../components/Navigation/Nav';
import MediaThumbnails from '../../components/MediaThumbnails/MediaThumbnails';
import BannerAlert from '../../components/BannerAlert/BannerAlert';

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
            let media = response.media;
            let result = media.concat(response.albums);
            if (result.length === 0) {
                this.addAlert(<BannerAlert variant="warning" heading="API Response:" body="Nothing was found."/>);
            }
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
            this.addAlert(<BannerAlert variant="danger" heading="API Error: " body={error.message}/>);
        });
    }

    render() { 
        return ( 
            <React.Fragment>
                <Navigation />
                {this.state.alerts.map(errorComponent => errorComponent)}
                {this.state.mediaList ? <MediaThumbnails collapseAlbums={this.state.collapseAlbums} mediaList={this.state.mediaList}/> : null}
            </React.Fragment>
         );
    }
}
