import React, { Component } from 'react';
import Select from 'react-select';

import API from '../../../api/API';
import { AlbumsRequest } from '../../../api/requests/AlbumRequests'

export default class AlbumSelector extends Component {
    state = { 
        isLoading : false,
        albumOptions : null,
     }

    getAlbumOptions = () => {
        if (this.state.albumOptions !== null || this.state.isLoading) {
            return;
        }
        this.setState({ isLoading : true })
        API.get(new AlbumsRequest()).then(response => {
            let albumOptions = [];
            response.forEach((album, index) => {
                albumOptions.push({ value: album.name, label: album.name });
            });
            this.setState({ albumOptions, isLoading : false });
        }).catch(error => {
            console.log(error);
            this.setState({ isLoading : false })
        })
    }

    render() { 
        return ( 
            <Select 
                placeholder="Enter Album name..."
                options={this.state.albumOptions === null ? [] : this.state.albumOptions}
                onChange={this.props.onChange}
                isSearchable
                isClearable
                isLoading={this.state.isLoading}
                onFocus={this.getAlbumOptions}
            />
         );
    }
}
