import React, { Component } from 'react';

import TagSelector from './TagSelector/TagSelector';
import UniqueQuerySelector from './UniqueQuerySelector/UniqueQuerySelector';

import { ArtistsRequest } from '../../api/requests/ArtistRequests';
import { CategoriesRequest } from '../../api/requests/CategoryRequests';

import './SearchMenu.css';

export default class SearchMenu extends Component {
    state = { 
        showAdvancedOptions : false,
        tagOptionsSelected : [],
        albumOptionSelected : null,
        artistOptionSelected : null,
        categoryOptionSelected : null
     }

    onSearch = () => {
        this.props.onSearch({
            'whitelist_tags' : this.state.tagOptionsSelected.map((tagOption) => {return tagOption.value}),
            'artist' : this.state.artistOptionSelected ? this.state.artistOptionSelected.value : null,
            'category' : this.state.categoryOptionSelected ? this.state.categoryOptionSelected.value : null
        })
    }

    render() { 
        return (
            <div id="search_menu">
                <div className="search_menu_item">
                    <p>Tags: </p>
                    <div className="selector">
                        <TagSelector onChange={(selectedOptions) => {this.setState({tagOptionsSelected : selectedOptions})}}/>
                    </div>
                </div>
                {this.state.showAdvancedOptions ? <div id="advanced_options">
                    <div className="search_menu_item">
                        <p>Category: </p>
                        <div className="selector">
                            <UniqueQuerySelector 
                                placeholder="Enter Category name..." 
                                request={new CategoriesRequest()} 
                                onChange={(selectedOption) => {this.setState({categoryOptionSelected : selectedOption})}}/>
                        </div>
                    </div>
                    <div className="search_menu_item">
                        <p>Artist: </p>
                        <div className="selector">
                            <UniqueQuerySelector 
                                placeholder="Enter Artist name..." 
                                request={new ArtistsRequest()} 
                                onChange={(selectedOption) => {this.setState({artistOptionSelected : selectedOption})}}/>
                        </div>
                    </div>
                </div> : null}
                <div>
                    <button class="btn btn-primary" id="search_button" onClick={this.onSearch}>Search</button>
                    <a 
                        onClick={() => {this.setState(prevState => ({showAdvancedOptions : !prevState.showAdvancedOptions}))}} 
                        id="show_advanced_options_element">
                            {this.state.showAdvancedOptions ? "hide advanced options" : "show advanced options"}
                    </a>
                </div>
            </div>
        );
    }
}
