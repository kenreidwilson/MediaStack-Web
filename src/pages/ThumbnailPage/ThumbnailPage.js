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

        function responseToDict(response) {
            if (response === null) {
                return null;
            }
            let dict = {}
            response.forEach(object => {
                dict[object.id] = object;
            })
            return dict;
        }

        let categories = {}
        let artists = {}
        let albums = {}

        await new CategoriesRequest().send().then(response => {
            categories = responseToDict(response);
        })

        await new ArtistsRequest().send().then(response => {
            artists = responseToDict(response);
        })

        await new AlbumsRequest().send().then(response => {
            albums = responseToDict(response);
        })

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
                if (a.category_id !== b.category_id) {
                    return categories[a.category_id].name > categories[b.category_id].name;
                } else if (a.artist_id !== b.artist_id) {
                    let a_artist = artists[a.artist_id]
                    let b_artist = artists[b.artist_id]
                    if (typeof a_artist === 'undefined') return false
                    if (typeof b_artist === 'undefined') return true
                    return artists[a.artist_id].name > artists[b.artist_id].name;
                } else if (a.album_id !== b.album_id) {
                    let a_album = albums[a.album_id]
                    let b_album = albums[b.album_id]
                    if (typeof a_album === 'undefined') return false
                    if (typeof b_album === 'undefined') return true
                    return albums[a.album_id].name > albums[b.album_id].name;
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
