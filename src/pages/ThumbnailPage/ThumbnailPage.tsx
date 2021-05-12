import React, { Component } from 'react';

import Navigation from '../../components/Navigation/Nav';
import MediaThumbnails from '../../components/MediaThumbnails/MediaThumbnails';
import BannerAlert from '../../components/BannerAlert/BannerAlert';

import { SearchRequest } from '../../api/requests/SearchRequests';
import Media from '../../model/Media';
import MediaSearchQuery from '../../api/requests/RequestModels/MediaSearchQuery';

const ThumbnailPage = () => {
    return (
        <ThumbnailPageComponent />
    );
}

type State = {
    collapseAlbums: boolean,
    mediaList: Media[],
    alerts: object[]
}

export default class ThumbnailPageComponent extends Component<{}, State> {
    state = { 
        collapseAlbums : true,
        mediaList : Array<Media>(),
        alerts : Array<object>()
    }

    addAlert = (alert: object) => {
        let alerts = this.state.alerts.concat(alert);
        this.setState({ alerts })
    }

    componentDidMount = async () => {
        await new SearchRequest(new MediaSearchQuery()).send().then(mediaList => {
            if (mediaList.length === 0) {
                this.addAlert(<BannerAlert variant="warning" heading="API Response:" body="Nothing was found."/>);
            }
            this.setState({ mediaList });
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
                        showAlbumCoverOnly={true}
                        mediaList={this.state.mediaList}/> 
                : null}
            </React.Fragment>
         );
    }
}
