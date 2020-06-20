import React, { Component } from 'react';

import TagSelector from './TagSelector/TagSelector';
import AlbumSelector from './AlbumSelector/AlbumSelector';

export default class SearchMenu extends Component {
    state = { 
        tagsSelected : [],
        albumSelected : null
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

    render() { 
        return (
            <div id="search_menu">
                <TagSelector onChange={this.onTagSelection}/>
            </div>
        );
    }
}
