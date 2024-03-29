import { SelectOption, GenericSearchQuery } from '../../types';
import { useState, useEffect } from 'react';
import useArtists from '../../hooks/useArtists';
import BaseSingleSelect from './BaseSingleSelect';

type Props = {
    selectedArtist?: SelectOption,
    onArtistChange: (option?: SelectOption) => void,
    artistsQuery?: GenericSearchQuery,
    isCreatable?: boolean,
    isDisabled?: boolean
}

export default function ArtistSelect({ selectedArtist, onArtistChange: onChange, artistsQuery, isCreatable = false, isDisabled = false } : Props) {

    const { search, add } = useArtists();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [artistOptions, setArtistOptions] = useState<SelectOption[] | undefined>(undefined);

    useEffect(() => {
        if (selectedArtist !== undefined && artistOptions === undefined) {
            loadArtistOptions();
        }
    });

    const loadArtistOptions = (): void => {
        if (artistOptions !== undefined) {
            return;
        }

        setIsLoading(true);
        getArtists().then((options) => {
            if (isCreatable) {
                setArtistOptions([{ label: '<No Artist>', value: null }, ...options]);
            } else {
                setArtistOptions(options);
            }
            setIsLoading(false);
        });
    }

    const getArtists = (): Promise<SelectOption[]> => {
        return search(artistsQuery ? artistsQuery : { count: 999 }).then(response => {
            return response.data.map(artist => {
                return { value: artist.id, label: artist.name };
            });
        });
    }

    const createArtist = (name: string): Promise<void> => {
        if (artistOptions === undefined) {
            return Promise.resolve();
        }

        setIsLoading(true);
        return add({ id: 0, name }).then(artist => {
            const newArtist = { label: artist.name, value: artist.id };
            setArtistOptions([ ...artistOptions, newArtist]);
            onChange(newArtist);
            setIsLoading(false);
        });
    }

    return (
        <BaseSingleSelect 
            placeHolder={'Select Artist'} 
            selectedOption={selectedArtist} 
            options={artistOptions ? artistOptions : []} 
            onCreate={createArtist} 
            onChange={onChange} 
            onMenuOpen={loadArtistOptions}
            isCreatable={isCreatable} 
            isLoading={isLoading}
            isDisabled={isDisabled}/>
        );
}
