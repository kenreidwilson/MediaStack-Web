import { useState } from 'react';
import { ArtistRepository } from '../../repositories/AritstRepository';
import BaseSingleSelect from './BaseSingleSelect';

type Props = {
    selectedArtist?: Option,
    onChange: Function,
    isCreatable?: boolean
}

type Option = {
    label: string,
    value?: any
}

export default function ArtistsSelect({ selectedArtist, onChange, isCreatable = false } : Props) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const artists = new ArtistRepository();

    const getArtists = async () => {
        setIsLoading(true);
        return await artists.search({ count: 999 }).then(response => {
            let _options: Option[] = [];
            response.artists.forEach(artist => {
                _options.push({ value: artist.id, label: artist.name });
            });
            setIsLoading(false);
            return _options;
        });
    }

    const createArtist = async (name: string) => {
        setIsLoading(true);
        return await artists.add({ id: 0, name }).then(artist => {
            setIsLoading(false);
            return { label: artist.name, value: artist.id };
        });
    }

    return (
        <BaseSingleSelect 
            placeHolder={"Select Category"} selectedOption={selectedArtist} getOptions={getArtists} createOption={createArtist} onChange={onChange} isCreatable={isCreatable} isLoading={isLoading}/>
        );
}