import { useState } from 'react';
import { AlbumRepository } from '../../repositories/AlbumRepository';
import BaseSingleSelect from './BaseSingleSelect';

type Props = {
    selectedAlbum?: Option,
    onChange: Function,
    isCreatable?: boolean
}

type Option = {
    label: string,
    value?: any
}

export default function AlbumSelect({ selectedAlbum, onChange, isCreatable = false } : Props) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const getAlbums = async () => {
        setIsLoading(true);
        return await new AlbumRepository().search({ count: 9999 }).then(response => {
            let _options: Option[] = [];
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