import { useState, useEffect } from 'react';
import { ArtistRepository } from '../repositories/AritstRepository';
import BaseSingleSelect from './BaseSingleSelect';
import SelectOption from '../types/SelectOption';
import { IGenericSearchQuery } from '../repositories/GenericRepository';

type Props = {
    selectedArtist?: SelectOption,
    onArtistChange: (option?: SelectOption) => void,
    artistsQuery?: IGenericSearchQuery,
    isCreatable?: boolean,
    isDisabled?: boolean
}

export default function ArtistSelect({ selectedArtist, onArtistChange: onChange, artistsQuery, isCreatable = false, isDisabled = false } : Props) {

    const artistRepo = new ArtistRepository();
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
            setArtistOptions(options);
            setIsLoading(false);
        });
    }

    const getArtists = (): Promise<SelectOption[]> => {
        return artistRepo.search(artistsQuery ? artistsQuery : { count: 999 }).then(response => {
            return response.artists.map(artist => {
                return { value: artist.id, label: artist.name };
            });
        });
    }

    const createArtist = (name: string): Promise<void> => {
        if (artistOptions === undefined) {
            return Promise.resolve();
        }

        setIsLoading(true);
        return artistRepo.add({ id: 0, name }).then(artist => {
            const newArtist = { label: artist.name, value: artist.id };
            setArtistOptions([ ...artistOptions, newArtist]);
            onChange(newArtist);
            setIsLoading(false);
        });
    }

    return (
        <BaseSingleSelect 
            placeHolder={"Select Artist"} 
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
