import Media from '../../types/Media';
import Album from '../../types/Album';
import IAlbumUpdateRequest from '../../types/IAlbumUpdateRequest';
import { useState } from 'react';
import useAlbums from '../../hooks/useAlbums';
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

    const [updateRequest, setUpdateRequest] = useState<IAlbumUpdateRequest>(
        { 
            ID: album.id, 
            categoryID: mediaList.length !== 0 ? mediaList[0].categoryID : undefined, //TODO: Find a better way.
            artistID: album.artistID,
            source: getAlbumSource(),
        }
    );

    const handleSave = (): Promise<void> => {
        return update(updateRequest).then(response => {
            onSave(response);
        });
    };
    
    return ( 
        <BaseEditModal title="Edit Album" isShown={isShown} onClose={onClose} onSave={handleSave} >
            <AlbumUpdateForm request={updateRequest} onChange={setUpdateRequest}/>
        </BaseEditModal>
     );
}
