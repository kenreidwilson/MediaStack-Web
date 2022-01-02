import { Album, AlbumUpdateRequest, Media } from '../../types';
import { useState, useEffect } from 'react';
import useAlbums from '../../hooks/useAlbums';
import usePromise from '../../hooks/usePromise';
import AlbumUpdateForm from '../Forms/AlbumUpdateForm';
import BaseEditModal from './BaseEditModal';

type Props = {
    album: Album,
    mediaList: Media[]
    isShown: boolean,
    onClose: () => void,
    onSave: (updatedAlbum: Album) => void 
}

export default function AlbumEditModal({album, mediaList, isShown, onClose, onSave}: Props) {

    const { update } = useAlbums();

    // TODO: Not Working
    const getAlbumSource = (): string => {
        let albumSource: string = '';

        mediaList.forEach(media => {
            if (media.source !== null && media.source !== '') {
                if (albumSource !== null && media.source !== albumSource) {
                    return '';
                }
                albumSource = media.source;
            }
        });

        return albumSource;
    };

    const [updateRequest, setUpdateRequest] = useState<AlbumUpdateRequest>(
        { 
            ID: album.id, 
            categoryID: mediaList.length !== 0 ? mediaList[0].categoryID : undefined, //TODO: Find a better way.
            artistID: album.artistID,
            source: getAlbumSource(),
        }
    );

    const { isLoading, error, result, resolve: updateAlbum, reset } = usePromise(() => update(updateRequest));

    useEffect(() => {
        if (result) {
            onSave(result);
        }
    }, [result]);
    
    useEffect(() => {
        if (!isShown) {
            reset();
        }
    }, [isShown]);

    return ( 
        <BaseEditModal 
            title='Edit Album'
            isShown={isShown} 
            isLoading={isLoading} 
            errorMessage={error?.message} 
            onClose={onClose} 
            onSave={updateAlbum}>
            <AlbumUpdateForm request={updateRequest} onChange={setUpdateRequest}/>
        </BaseEditModal>
     );
}
