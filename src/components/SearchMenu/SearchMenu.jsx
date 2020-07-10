import React, { Component } from 'react';
import Select from 'react-select';

import TagSelector from './TagSelector/TagSelector';
import UniqueQuerySelector from './UniqueQuerySelector/UniqueQuerySelector';
import RatingSelector from './RatingSelector/RatingSelector';

import { ArtistsRequest } from '../../api/requests/ArtistRequests';
import { CategoriesRequest } from '../../api/requests/CategoryRequests';

import './SearchMenu.css';

export default class SearchMenu extends Component {
    state = { 
        showAdvancedOptions : false,
        tagOptionsSelected : [],
        albumOptionSelected : null,
        artistOptionSelected : null,
        categoryOptionSelected : null,
        typeOptionSelected : null,
        ratingOptionSelected : null
     }

    onSearch = () => {
        let searchQuery = {};

        if (this.state.tagOptionsSelected) {
            searchQuery['whitelist_tags'] = this.state.tagOptionsSelected.map((tagOption) => {return tagOption.value});
        }

        if (this.state.artistOptionSelected) {
            searchQuery['artist'] = this.state.artistOptionSelected.value;
        }

        if (this.state.categoryOptionSelected) {
            searchQuery['category'] = this.state.categoryOptionSelected.value;
        }

        if (this.state.typeOptionSelected) {
            searchQuery['type'] = this.state.typeOptionSelected.value;
        }

        if (this.state.ratingOptionSelected) {
            searchQuery[this.state.ratingOptionSelected.comparator] = this.state.ratingOptionSelected.value;
        }

        this.props.onSearch(searchQuery);
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
                    <div className="search_menu_item">
                        <p>Type: </p>
                        <div className="selector">
                        <Select 
                            placeholder={"Choose a media type..."}
                            options={[{ 'label': 'image', value: 'image'}, { 'label': 'animated_image', value: 'animated_image'}, { 'label': 'video', value: 'video'}]}
                            value={this.state.typeOptionSelected}
                            onChange={(selectedOption) => this.setState({ typeOptionSelected : selectedOption })}
                            isSearchable
                            isClearable
                        />
                        </div>
                    </div>
                    <div className="search_menu_item">
                        <p>Rating: </p>
                        <div className="selector">
                            <RatingSelector 
                                onChange={(selectedOption) => this.setState({ ratingOptionSelected : selectedOption })}/>
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
