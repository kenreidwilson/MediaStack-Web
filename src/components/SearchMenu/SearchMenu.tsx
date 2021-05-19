import React, { useState } from 'react';
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

export default function SearchMenu({ onSearch }: Props) {

    const [showAdvancedOptions, setShowAdvancedOptions] = useState<boolean>(false);
    const [tagOptionsSelected, setTagOptionsSelected] = useState<Option[]>([]);
    const [blacklistTagOptionsSelected, setBlacklistTagOptionsSelected] = useState<Option[]>([]);
    const [albumOptionSelected, setAlbumOptionSelected] = useState<Option | undefined>(undefined);
    const [artistOptionSelected, setArtistOptionSelected] = useState<Option | undefined>(undefined);
    const [categoryOptionSelected, setCategoryOptionSelected] = useState<Option | undefined>(undefined);
    const [typeOptionSelected, setTypeOptionSelected] = useState<Option | undefined>(undefined);
    const [ratingComparator, setRatingComparator] = useState<string | undefined>(undefined);
    const [ratingValue, setRatingValue] = useState<number | undefined>(undefined);

    const handleSearch = () => {
        let searchQuery = new MediaSearchQuery();

        if (tagOptionsSelected) {
            searchQuery.whitelistTagIDs = tagOptionsSelected.map((tagOption) => {return tagOption!['value']});
        }

        if (blacklistTagOptionsSelected) {
            searchQuery.blacklistTagIDs = blacklistTagOptionsSelected.map((tagOption) => {return tagOption!['value']});
        }

        if (artistOptionSelected != null) {
            searchQuery.artistID = artistOptionSelected!['value']; 
        }

        if (categoryOptionSelected) {
            searchQuery.categoryID = categoryOptionSelected!['value'];
        }

        if (typeOptionSelected) {
            searchQuery.type = typeOptionSelected!['value'];
        }

        if (ratingComparator) {
            if (ratingComparator === 'greaterThan') {
                searchQuery.greaterThanScore = ratingValue;
            }
            if (ratingComparator === 'lessThan') {
                searchQuery.lessThanScore = ratingValue;
            }
            else {
                searchQuery.score = ratingValue;
            }
        }

        onSearch(searchQuery);
    }

    const setRatingQuery = (newRating: number, ratingComparator: string) => {
        setRatingValue(newRating);
        setRatingComparator(ratingComparator);
    }

    return (
        <div id="search_menu">
            <div className="search_menu_item">
                <p>Tags: </p>
                <div className="selector">
                    <TagSelector onChange={(selectedOptions: Option[]) => setTagOptionsSelected(selectedOptions)}/>
                </div>
            </div>
            {showAdvancedOptions ? <div id="advanced_options">
                <div className="search_menu_item">
                    <p>Blacklist Tags: </p>
                    <div className="selector">
                        <TagSelector onChange={(selectedOptions: Option[]) => setBlacklistTagOptionsSelected(selectedOptions)}/>
                    </div>
                </div>
                <div className="search_menu_item">
                    <p>Category: </p>
                    <div className="selector">
                        <UniqueQuerySelector 
                            placeHolder="Enter Category name..." 
                            request={new CategoriesRequest()} 
                            onChange={(selectedOption: Option) => setCategoryOptionSelected(selectedOption)}/>
                    </div>
                </div>
                <div className="search_menu_item">
                    <p>Artist: </p>
                    <div className="selector">
                        <UniqueQuerySelector 
                            placeHolder="Enter Artist name..." 
                            request={new ArtistsRequest()} 
                            onChange={(selectedOption: Option) => setArtistOptionSelected(selectedOption)}/>
                    </div>
                </div>
                <div className="search_menu_item">
                    <p>Type: </p>
                    <div className="selector">
                    <Select 
                        placeholder={"Choose a media type..."}
                        options={[{ 'label': 'image', value: 'image'}, { 'label': 'animated_image', value: 'animated_image'}, { 'label': 'video', value: 'video'}]}
                        value={typeOptionSelected}
                        onChange={(selectedOption: any) => setTypeOptionSelected(selectedOption)}
                        isSearchable
                        isClearable
                    />
                    </div>
                </div>
                <div className="search_menu_item">
                    <p>Rating: </p>
                    <div className="selector">
                        <RatingSelector ratingValue={ratingValue ? ratingValue as number : 0} onChange={setRatingQuery}/>
                    </div>
                </div>
            </div> : null}
            <div>
                <button className="btn btn-primary" id="search_button" onClick={handleSearch}>Search</button>
                <a 
                    href="/#"
                    onClick={() => setShowAdvancedOptions(!showAdvancedOptions)} 
                    id="show_advanced_options_element">
                        {showAdvancedOptions ? "hide advanced options" : "show advanced options"}
                </a>
            </div>
        </div>
    );
}
