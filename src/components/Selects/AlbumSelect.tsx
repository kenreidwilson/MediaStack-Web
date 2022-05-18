import { SelectOption, AlbumSearchQuery } from '../../types';
import { useState, useEffect, useContext } from 'react';
import { ErrorContext } from '../../contexts/ErrorContext';
import useAlbums from '../../hooks/useAlbums';
import BaseSingleSelect from './BaseSingleSelect';

type Props = {
    selectedAlbum?: SelectOption,
    onAlbumChange: (option?: SelectOption) => void,
    albumsQuery?: AlbumSearchQuery,
    albumArtistId?: number,
    isCreatable?: boolean,
    isDisabled?: boolean
}

export default function AlbumSelect({  selectedAlbum, onAlbumChange: onChange, albumsQuery, albumArtistId, isCreatable = false, isDisabled = false } : Props) {

    const { addError } = useContext(ErrorContext);
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

    const getAlbumQuery = (): AlbumSearchQuery => {
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
            if (isCreatable) {
                setAlbumOptions([ { label: '<No Album>', value: null }, ...options ]);
            } else {
                setAlbumOptions(options);
            }
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
            addError(new Error('Can\'t create album with unknown Artist.'));
            return Promise.resolve();
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
            placeHolder={'Select Album'} 
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
