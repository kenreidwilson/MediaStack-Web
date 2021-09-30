import { useState } from 'react';
import Select from 'react-select';

import TagSelector from '../ModelSelects/TagSelector';
import RatingSelector from './RatingSelector/RatingSelector';

import './SearchMenu.css';
import CategorySelect from '../ModelSelects/CategorySelect';
import ArtistsSelect from '../ModelSelects/ArtistSelect';
import { IMediaSearchQuery } from '../../repositories/MediaRepository';

type Option = {
    label: string,
    value: any | null
}

type Props = {
    onSearch: Function
}

export default function SearchMenu({ onSearch }: Props) {

    const modeOptions: Option[] = [
		{ label: "Media and Album Cover", value: 2 },
        { label: "All Media", value: 1 },
		{ label: "Media with no Album", value: 3 }
	];

    const [showAdvancedOptions, setShowAdvancedOptions] = useState<boolean>(false);
    const [tagOptionsSelected, setTagOptionsSelected] = useState<Option[]>([]);
    const [modeSelected, setModeSelected] = useState<Option>(modeOptions[0]);
    const [blacklistTagOptionsSelected, setBlacklistTagOptionsSelected] = useState<Option[]>([]);
    const [albumOptionSelected, setAlbumOptionSelected] = useState<Option | undefined>(undefined);
    const [artistOptionSelected, setArtistOptionSelected] = useState<Option | undefined>(undefined);
    const [categoryOptionSelected, setCategoryOptionSelected] = useState<Option | undefined>(undefined);
    const [typeOptionSelected, setTypeOptionSelected] = useState<Option | undefined>(undefined);
    const [sortByOptionSelected, setSortByOption] = useState<Option | undefined>(undefined);
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
        searchQuery.mode = modeSelected.value;

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
                    <Select
                        value={modeSelected}
                        options={modeOptions}
                        onChange={(selectedMode: any) => setModeSelected(selectedMode)}/>
                </div>
            </div>
            <div className="search_menu_item">
                <p>Tags: </p>
                <div className="selector">
                    <TagSelector onChange={(selectedOptions: Option[]) => setTagOptionsSelected(selectedOptions)} selectedTags={tagOptionsSelected}  isMulti={true} isCreatable={false}/>
                </div>
            </div>
            {showAdvancedOptions ? <div id="advanced_options">
                <div className="search_menu_item">
                    <p>Blacklist Tags: </p>
                    <div className="selector">
                        <TagSelector onChange={(selectedOptions: Option[]) => setBlacklistTagOptionsSelected(selectedOptions)} selectedTags={blacklistTagOptionsSelected} isMulti={true} isCreatable={false}/>
                    </div>
                </div>
                <div className="search_menu_item">
                    <p>Category: </p>
                    <div className="selector">
                        <CategorySelect selectedCategory={categoryOptionSelected} onChange={setCategoryOptionSelected} />
                    </div>
                </div>
                <div className="search_menu_item">
                    <p>Artist: </p>
                    <div className="selector">
                        <ArtistsSelect selectedArtist={artistOptionSelected} onChange={setArtistOptionSelected} />
                    </div>
                </div>
                <div className="search_menu_item">
                    <p>Type: </p>
                    <div className="selector">
                    <Select 
                        placeholder={"Choose a media type..."}
                        options={[{ 'label': 'Image', value: 1}, { 'label': 'Animated Image', value: 2}, { 'label': 'Video', value: 3}]}
                        value={typeOptionSelected!}
                        onChange={(selectedOption: any) => setTypeOptionSelected(selectedOption)}
                        isSearchable
                        isClearable
                    />
                    </div>
                </div>
                <div className="search_menu_item">
                    <p>Sort By: </p>
                    <div className="selector">
                    <Select 
                        placeholder={"Sort By Property..."}
                        options={[{ 'label': 'Category', value: "Category"}, { 'label': 'Score', value: "Score"}]}
                        value={sortByOptionSelected!}
                        onChange={(selectedOption: any) => setSortByOption(selectedOption)}
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
