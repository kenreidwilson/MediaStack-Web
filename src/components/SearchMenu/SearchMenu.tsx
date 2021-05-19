import React, { Component } from 'react';
import Select from 'react-select';

import TagSelector from './TagSelector/TagSelector';
import UniqueQuerySelector from './UniqueQuerySelector/UniqueQuerySelector';
import RatingSelector from './RatingSelector/RatingSelector';

import { ArtistsRequest } from '../../api/requests/ArtistRequests';
import { CategoriesRequest } from '../../api/requests/CategoryRequests';
import MediaSearchQuery from '../../api/requests/RequestBodies/MediaSearchQuery';

import './SearchMenu.css';

type Option = {
    label: string,
    value: any | null
}

type Props = {
    onSearch: Function
}

type State = {
    showAdvancedOptions: boolean,
    tagOptionsSelected: Option[],
    blacklistTagOptionsSelected: Option[],
    albumOptionSelected: Option | null,
    artistOptionSelected: Option | null,
    categoryOptionSelected: Option | null,
    typeOptionSelected: Option | null,
    ratingComparator: string | null,
    ratingValue: number
}

export default class SearchMenu extends Component<Props, State> {
    state = { 
        showAdvancedOptions : false,
        tagOptionsSelected : [],
        blacklistTagOptionsSelected : [],
        albumOptionSelected : null,
        artistOptionSelected : null,
        categoryOptionSelected : null,
        typeOptionSelected : null,
        ratingComparator : null,
        ratingValue : 0
     }

    onSearch = () => {
        let searchQuery = new MediaSearchQuery();

        if (this.state.tagOptionsSelected) {
            searchQuery.whitelistTagIDs = this.state.tagOptionsSelected.map((tagOption) => {return tagOption!['value']});
        }

        if (this.state.blacklistTagOptionsSelected) {
            searchQuery.blacklistTagIDs = this.state.blacklistTagOptionsSelected.map((tagOption) => {return tagOption!['value']});
        }

        if (this.state.artistOptionSelected != null) {
            searchQuery.artistID = this.state.artistOptionSelected!['value']; 
        }

        if (this.state.categoryOptionSelected) {
            searchQuery.categoryID = this.state.categoryOptionSelected!['value'];
        }

        if (this.state.typeOptionSelected) {
            searchQuery.type = this.state.typeOptionSelected!['value'];
        }

        if (this.state.ratingComparator) {
            if (this.state.ratingComparator == 'greaterThan') {
                searchQuery.greaterThanScore = this.state.ratingValue;
            }
            if (this.state.ratingComparator == 'lessThan') {
                searchQuery.lessThanScore = this.state.ratingValue;
            }
            else {
                searchQuery.score = this.state.ratingValue;
            }
        }

        this.props.onSearch(searchQuery);
    }

    ratingFunction = (newRating: number, ratingComparator: string) => {
        this.setState({ratingValue: newRating, ratingComparator: ratingComparator});
    }

    handleSelectChange = (option: any) => {
        this.setState({ typeOptionSelected: option });
    }

    render() { 
        return (
            <div id="search_menu">
                <div className="search_menu_item">
                    <p>Tags: </p>
                    <div className="selector">
                        <TagSelector onChange={(selectedOptions: Option[]) => {this.setState({tagOptionsSelected : selectedOptions})}}/>
                    </div>
                </div>
                {this.state.showAdvancedOptions ? <div id="advanced_options">
                    <div className="search_menu_item">
                        <p>Blacklist Tags: </p>
                        <div className="selector">
                            <TagSelector onChange={(selectedOptions: Option[]) => {this.setState({blacklistTagOptionsSelected : selectedOptions})}}/>
                        </div>
                    </div>
                    <div className="search_menu_item">
                        <p>Category: </p>
                        <div className="selector">
                            <UniqueQuerySelector 
                                placeholder="Enter Category name..." 
                                request={new CategoriesRequest()} 
                                onChange={(selectedOption: Option) => {this.setState({categoryOptionSelected : selectedOption})}}/>
                        </div>
                    </div>
                    <div className="search_menu_item">
                        <p>Artist: </p>
                        <div className="selector">
                            <UniqueQuerySelector 
                                placeholder="Enter Artist name..." 
                                request={new ArtistsRequest()} 
                                onChange={(selectedOption: Option) => {this.setState({artistOptionSelected : selectedOption})}}/>
                        </div>
                    </div>
                    <div className="search_menu_item">
                        <p>Type: </p>
                        <div className="selector">
                        <Select 
                            placeholder={"Choose a media type..."}
                            options={[{ 'label': 'image', value: 'image'}, { 'label': 'animated_image', value: 'animated_image'}, { 'label': 'video', value: 'video'}]}
                            value={this.state.typeOptionSelected}
                            onChange={(selectedOption: any) => this.setState({ typeOptionSelected : selectedOption })}
                            isSearchable
                            isClearable
                        />
                        </div>
                    </div>
                    <div className="search_menu_item">
                        <p>Rating: </p>
                        <div className="selector">
                            <RatingSelector ratingValue={this.state.ratingValue} onChange={this.ratingFunction}/>
                        </div>
                    </div>
                </div> : null}
                <div>
                    <button className="btn btn-primary" id="search_button" onClick={this.onSearch}>Search</button>
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
