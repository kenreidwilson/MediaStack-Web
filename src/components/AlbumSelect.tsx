import { useState, useEffect } from 'react';
import { IAlbumSearchQuery } from '../repositories/AlbumRepository';
import BaseSingleSelect from './BaseSingleSelect';
import SelectOption from '../types/SelectOption';
import useAlbums from '../hooks/useAlbums';

type Props = {
    selectedAlbum?: SelectOption,
    onAlbumChange: (option?: SelectOption) => void,
    albumsQuery?: IAlbumSearchQuery,
    albumArtistId?: number,
    isCreatable?: boolean,
    isDisabled?: boolean
}

export default function AlbumSelect({  selectedAlbum, onAlbumChange: onChange, albumsQuery, albumArtistId, isCreatable = false, isDisabled = false } : Props) {

    const { search, add } = useAlbums();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [albumOptions, setAlbumOptions] = useState<SelectOption[] | undefined>(undefined);

    useEffect(() => {
        if (selectedAlbum !== undefined && albumOptions === undefined) {
            loadAlbumOptions();
        }
    })

    const canCreateAlbum = (): boolean => {
        return isCreatable && albumArtistId !== undefined;
    }

    const getAlbumQuery = (): IAlbumSearchQuery => {
        if (albumsQuery !== undefined) {
            return albumsQuery;
        }
        if (albumArtistId !== undefined) {
            return { count: 9999, artistId: albumArtistId };
        }
        return { count: 9999 };
    }

    const loadAlbumOptions = (): void => {
        if (albumOptions !== undefined) {
            return;
        }

        setIsLoading(true);
        getAlbums().then(options => {
            setAlbumOptions(options);
            setIsLoading(false);
        });
    }

    const getAlbums = (): Promise<SelectOption[]> => {
        return search(getAlbumQuery()).then(response => {
            return response.data.map(album => {
                return { value: album.id, label: album.name };
            });
        });
    }

    const createAlbum = (name: string): Promise<void> => {

        if (albumOptions === undefined) {
            return Promise.resolve();
        }

        if (!canCreateAlbum()) {
            throw "Can't create album with unknown Artist.";
        }

        setIsLoading(true);
        return add( { id: 0, name, artistID: albumArtistId! } ).then(album => {
            const newAlbum = { label: album.name, value: album.id };
            setAlbumOptions([...albumOptions, newAlbum ]);
            onChange(newAlbum);
            setIsLoading(false);
        });
    }

    return (
        <BaseSingleSelect 
            placeHolder={"Select Album"} 
            selectedOption={selectedAlbum} 
            options={albumOptions ? albumOptions : []} 
            onCreate={createAlbum} 
            onChange={onChange} 
            onMenuOpen={loadAlbumOptions}
            isCreatable={canCreateAlbum()} 
            isLoading={isLoading}
            isDisabled={isDisabled}/>
        );
}
