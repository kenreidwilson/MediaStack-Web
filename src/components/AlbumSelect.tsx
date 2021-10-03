import { useState } from 'react';
import BaseSingleSelect from './BaseSingleSelect';
import SelectOption from '../types/SelectOption';
import { AlbumRepository } from '../repositories/AlbumRepository';

type Props = {
    selectedAlbum?: SelectOption,
    onChange: (option?: SelectOption) => void,
    isCreatable?: boolean
}

export default function AlbumSelect({ selectedAlbum, onChange, isCreatable = false } : Props) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const getAlbums = async () => {
        setIsLoading(true);
        return await new AlbumRepository().search({ count: 9999 }).then(response => {
            let _options: SelectOption[] = [];
            response.albums.forEach(album => {
                _options.push({ value: album.id, label: album.name });
            });
            setIsLoading(false);
            return _options;
        });
    }

    const createAlbum = async (name: string) => {
        setIsLoading(true);
        //return await new AlbumCreationRequest(name).send().then(album => {
            //setIsLoading(false);
            //return { label: album.name, value: album.id };
        //});
    }

    return (
        <BaseSingleSelect 
            placeHolder={"Select Category"} selectedOption={selectedAlbum} getOptions={getAlbums} createOption={createAlbum} onChange={onChange} isCreatable={isCreatable} isLoading={isLoading}/>
        );
}