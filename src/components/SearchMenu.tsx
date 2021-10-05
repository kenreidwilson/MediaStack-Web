import { useState } from 'react';

import TagSelect from './TagSelect';
import RatingSelector from './RatingSelector';

import './SearchMenu.css';
import CategorySelect from './CategorySelect';
import ArtistsSelect from './ArtistSelect';
import { IMediaSearchQuery } from '../repositories/MediaRepository';
import MediaTypeSelect from './MediaTypeSelect';
import SelectOption from '../types/SelectOption';
import SortBySelect from './SortBySelect';
import SearchModeSelect from './SearchModeSelect';

type Props = {
    onSearch: Function
}

export default function SearchMenu({ onSearch }: Props) {

    const [showAdvancedOptions, setShowAdvancedOptions] = useState<boolean>(false);
    const [tagOptionsSelected, setTagOptionsSelected] = useState<SelectOption[]>([]);
    const [modeSelected, setModeSelected] = useState<SelectOption | undefined>(undefined);
    const [blacklistTagOptionsSelected, setBlacklistTagOptionsSelected] = useState<SelectOption[]>([]);
    const [albumOptionSelected, setAlbumOptionSelected] = useState<SelectOption | undefined>(undefined);
    const [artistOptionSelected, setArtistOptionSelected] = useState<SelectOption | undefined>(undefined);
    const [categoryOptionSelected, setCategoryOptionSelected] = useState<SelectOption | undefined>(undefined);
    const [typeOptionSelected, setTypeOptionSelected] = useState<SelectOption | undefined>(undefined);
    const [sortByOptionSelected, setSortByOption] = useState<SelectOption | undefined>(undefined);
    const [ratingComparator, setRatingComparator] = useState<string | undefined>(undefined);
    const [ratingValue, setRatingValue] = useState<number | undefined>(undefined);

    const handleSearch = () => {
        let searchQuery: IMediaSearchQuery = {};

        if (tagOptionsSelected) {
            searchQuery.whitelistTagIDs = tagOptionsSelected.map((tagOption) => {return tagOption!['value']});
        }

        if (blacklistTagOptionsSelected) {
            searchQuery.blacklistTagIDs = blacklistTagOptionsSelected.map((tagOption) => {return tagOption!['value']});
        }

        searchQuery.artistID = artistOptionSelected?.value;
        searchQuery.categoryID = categoryOptionSelected?.value;
        searchQuery.type = typeOptionSelected?.value;
        searchQuery.sortBy = sortByOptionSelected?.value;
        searchQuery.mode = modeSelected?.value;

        if (ratingComparator) {
            if (ratingComparator === 'greaterThanScore') {
                searchQuery.greaterThanScore = ratingValue!;
            }
            if (ratingComparator === 'lessThanScore') {
                searchQuery.lessThanScore = ratingValue!;
            }
            else {
                searchQuery.score = ratingValue!;
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
                <p>Mode: </p>
                <div className="selector">
                    <SearchModeSelect onChange={setModeSelected} selectedMode={modeSelected} />
                </div>
            </div>
            <div className="search_menu_item">
                <p>Tags: </p>
                <div className="selector">
                    <TagSelect onTagsChange={setTagOptionsSelected} selectedTags={tagOptionsSelected} isCreatable={false}/>
                </div>
            </div>
            {showAdvancedOptions ? <div id="advanced_options">
                <div className="search_menu_item">
                    <p>Blacklist Tags: </p>
                    <div className="selector">
                        <TagSelect onTagsChange={setBlacklistTagOptionsSelected} selectedTags={blacklistTagOptionsSelected} isCreatable={false}/>
                    </div>
                </div>
                <div className="search_menu_item">
                    <p>Category: </p>
                    <div className="selector">
                        <CategorySelect selectedCategory={categoryOptionSelected} onCategoryChange={setCategoryOptionSelected} />
                    </div>
                </div>
                <div className="search_menu_item">
                    <p>Artist: </p>
                    <div className="selector">
                        <ArtistsSelect selectedArtist={artistOptionSelected} onArtistChange={setArtistOptionSelected} />
                    </div>
                </div>
                <div className="search_menu_item">
                    <p>Type: </p>
                    <div className="selector">
                        <MediaTypeSelect  onChange={setTypeOptionSelected} selectedType={typeOptionSelected}/>
                    </div>
                </div>
                <div className="search_menu_item">
                    <p>Sort By: </p>
                    <div className="selector">
                        <SortBySelect selectedSortOption={sortByOptionSelected} onChange={setSortByOption}/>
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
