import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { IMediaSearchQuery } from "../repositories/MediaRepository";
import SelectOption from "../types/SelectOption";
import AlbumSelect from "./AlbumSelect";
import ArtistSelect from "./ArtistSelect";
import CategorySelect from "./CategorySelect";
import MediaTypeSelct from "./MediaTypeSelect";
import RatingComparatorSelect from "./RatingComparatorSelect";
import RatingStars from "./RatingStars";
import SearchModeSelect from "./SearchModeSelect";
import SortBySelect from "./SortBySelect";
import TagSelect from "./TagSelect";

type Props = {
    query: IMediaSearchQuery,
    onChange?: (query: IMediaSearchQuery) => void,
    showMode?: boolean,
    showTags?: boolean,
    showBlacklistTags?: boolean,
    showAlbum?: boolean,
    showArtist?: boolean,
    showCategory?: boolean,
    showType?: boolean,
    showSortBy?: boolean,
    showRatingComparator?: boolean,
    showRatingValue?: boolean
}

export default function MediaSearchForm(
    {
        query,
        onChange,
        showMode = true,
        showTags = true,
        showBlacklistTags = true,
        showAlbum = true,
        showArtist = true,
        showCategory = true,
        showType = true,
        showSortBy = true,
        showRatingComparator = true,
        showRatingValue = true
    }: Props) {
    
    const [modeSelected, setModeSelected] = useState<SelectOption | undefined>(query.mode ? { value: query.mode } : undefined);
    const [tagOptionsSelected, setTagOptionsSelected] = useState<SelectOption[]>(query.whitelistTagIDs ? query.whitelistTagIDs.map(t => {return { value: t }}) : []);
    const [blacklistTagOptionsSelected, setBlacklistTagOptionsSelected] = useState<SelectOption[]>(query.blacklistTagIDs ? query.blacklistTagIDs.map(t => {return { value: t }}) : []);
    const [albumOptionSelected, setAlbumOptionSelected] = useState<SelectOption | undefined>(query.albumID ? { value: query.albumID } : undefined);
    const [artistOptionSelected, setArtistOptionSelected] = useState<SelectOption | undefined>(query.artistID ? { value: query.artistID } : undefined);
    const [categoryOptionSelected, setCategoryOptionSelected] = useState<SelectOption | undefined>(query.categoryID ? { value: query.categoryID } : undefined);
    const [typeOptionSelected, setTypeOptionSelected] = useState<SelectOption | undefined>(query.type ? { value: query.type } : undefined);
    const [sortByOptionSelected, setSortByOption] = useState<SelectOption | undefined>(query.sortBy ? { value: query.sortBy } : undefined);
    const [ratingComparator, setRatingComparator] = useState<SelectOption | undefined>(undefined);
    const [ratingValue, setRatingValue] = useState<number>(0);
    
    useEffect(() => {
        if (onChange === undefined) {
            return;
        }

        onChange({
            mode: modeSelected?.value,
            whitelistTagIDs: tagOptionsSelected.length === 0 ? undefined : tagOptionsSelected.map(to => to.value),
            blacklistTagIDs: blacklistTagOptionsSelected.length === 0 ? undefined : blacklistTagOptionsSelected.map(to => to.value),
            albumID: albumOptionSelected?.value,
            artistID: artistOptionSelected?.value,
            categoryID: categoryOptionSelected?.value,
            type: typeOptionSelected?.value,
            sortBy: sortByOptionSelected?.value,
            score: ratingComparator?.value === "score" ? ratingValue : undefined,
            lessThanScore: ratingComparator?.value === "lessThanScore" ? ratingValue : undefined,
            greaterThanScore: ratingComparator?.value === "greaterThanScore" ? ratingValue : undefined
        });
    }, [modeSelected, 
        tagOptionsSelected, 
        blacklistTagOptionsSelected, 
        albumOptionSelected, 
        artistOptionSelected, 
        categoryOptionSelected, 
        sortByOptionSelected, 
        typeOptionSelected,
        ratingComparator, 
        ratingValue])

    return (
        <Form>
            {showMode ? <Form.Group>
                <Form.Label>Mode</Form.Label>
                <SearchModeSelect selectedMode={modeSelected} onChange={setModeSelected}/>
            </Form.Group> : null}
            
            {showTags ? <Form.Group>
                <Form.Label>Tags</Form.Label>
                <TagSelect selectedTags={tagOptionsSelected} onTagsChange={setTagOptionsSelected}/>
            </Form.Group> : null}

            {showBlacklistTags ? <Form.Group>
                <Form.Label>Blacklist Tags</Form.Label>
                <TagSelect selectedTags={blacklistTagOptionsSelected} onTagsChange={setBlacklistTagOptionsSelected}/>
            </Form.Group> : null}

            {showAlbum ? <Form.Group>
                <Form.Label>Album</Form.Label>
                <AlbumSelect selectedAlbum={albumOptionSelected} onAlbumChange={setAlbumOptionSelected}/>
            </Form.Group> : null}

            {showArtist ? <Form.Group>
                <Form.Label>Artist</Form.Label>
                <ArtistSelect selectedArtist={artistOptionSelected} onArtistChange={setArtistOptionSelected}/>
            </Form.Group> : null}

            {showCategory ? <Form.Group>
                <Form.Label>Category</Form.Label>
                <CategorySelect selectedCategory={categoryOptionSelected} onCategoryChange={setCategoryOptionSelected}/>
            </Form.Group> : null}

            {showType ? <Form.Group>
                <Form.Label>Media Type</Form.Label>
                <MediaTypeSelct selectedType={typeOptionSelected} onChange={setTypeOptionSelected}/>
            </Form.Group> : null}

            {showSortBy ? <Form.Group>
                <Form.Label>Sort By</Form.Label>
                <SortBySelect selectedSortOption={sortByOptionSelected} onChange={setSortByOption}/>
            </Form.Group> : null}

            {showRatingComparator || showRatingValue ? <Form.Group>
                <Form.Label>Rating: </Form.Label>
                {showRatingComparator ? 
                    <RatingComparatorSelect selectedComparatorOption={ratingComparator} onChange={setRatingComparator} /> : null}
                {showRatingValue ? 
                    <RatingStars value={ratingValue} onChange={(value) => {
                        if (ratingComparator?.value === undefined) {
                            setRatingComparator({ value: "score" });
                        }
                        setRatingValue(value);
                    }} /> : null}
            </Form.Group> : null}

        </Form>
    );
}
