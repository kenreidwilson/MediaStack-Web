import React, { Component } from 'react';

import TagSelector from './TagSelector/TagSelector';
import UniqueQuerySelector from './UniqueQuerySelector/UniqueQuerySelector';
import { AlbumsRequest } from '../../api/requests/AlbumRequests';
import { ArtistsRequest } from '../../api/requests/ArtistRequests';
import { CategoriesRequest } from '../../api/requests/CategoryRequests';

import './SearchMenu.css';

export default class SearchMenu extends Component {
    state = { 
        tagsSelected : [],
        albumSelected : null,
        artistSelected : null,
        categorySelected : null
     }

    onTagSelection = tagsSelected => {
        if (tagsSelected === null) {
            return;
        }
        let newSelectedTags = [];
        tagsSelected.forEach(tag => {
            newSelectedTags.push(tag.value);
        })
        this.setState({ tagsSelected : newSelectedTags })
    }

    onAlbumSelection = albumSelected => {
        this.setState({ albumSelected });
    }

    onArtistSelection = artistSelected => {
        this.setState({ artistSelected });
    }

    onCategorySelection = categorySelected => {
        this.setState({ categorySelected });
    }

    onSearch = () => {
        this.props.onSearch({
            'whitelist_tags' : this.state.tagsSelected,
            'album' : this.state.albumSelected ? this.state.albumSelected.value : null,
            'artist' : this.state.artistSelected ? this.state.artistSelected.value : null,
            'category' : this.state.categorySelected ? this.state.categorySelected.value : null
        })
    }

    render() { 
        return (
            <div id="search_menu">
                <div className="search_menu_item">
                    <h4>Tags: </h4>
                    <div className="selector">
                        <TagSelector onChange={this.onTagSelection}/>
                    </div>
                </div>
                <div className="search_menu_item">
                    <h4>Album: </h4>
                    <div className="selector">
                        <UniqueQuerySelector placeholder="Enter Album name..." request={new AlbumsRequest()} onChange={this.onAlbumSelection}/>
                    </div>
                </div>
                <div className="search_menu_item">
                    <h4>Artist: </h4>
                    <div className="selector">
                        <UniqueQuerySelector placeholder="Enter Artist name..." request={new ArtistsRequest()} onChange={this.onArtistSelection}/>
                    </div>
                </div>
                <div className="search_menu_item">
                    <h4>Category: </h4>
                    <div className="selector">
                        <UniqueQuerySelector placeholder="Enter Category name..." request={new CategoriesRequest()} onChange={this.onCategorySelection}/>
                    </div>
                </div>
                <button id="search_button" onClick={this.onSearch}>Search</button>
            </div>
        );
    }
}
