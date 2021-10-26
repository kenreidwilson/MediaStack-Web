import Media from '../../types/Media';
import Tag from '../../types/Tag';
import IMediaUpdateRequest from '../../types/IMediaUpdateRequest';
import IAlbumUpdateRequest from '../../types/IAlbumUpdateRequest';
import { useState, useEffect } from 'react';
import usePromise from '../../hooks/usePromise';
import useMedia from '../../hooks/useMedia';
import BaseEditModal from './BaseEditModal';
import AlbumUpdateForm from '../Forms/AlbumUpdateForm';

type Props = {
    mediaList: Media[],
    isShown: boolean,
    onClose?: () => void,
    onSave?: (updatedMediaList: Media[]) => void
}

export default function MediaListEditModal({ 
    mediaList, 
    isShown, 
    onClose = () => {}, 
    onSave = () => {} }: Props) {

    const { update } = useMedia();
    const [albumUpdateRequest, setAlbumUpdateRequest] = useState<IAlbumUpdateRequest>({ ID: 0 });

    const generateMediaUpdateRequests = 
        (albumUpdateRequest: IAlbumUpdateRequest, mediaToUpdate: Media[]): IMediaUpdateRequest[] => {
            
        return mediaToUpdate.map(media => {

            let mediaUpdateRequest: IMediaUpdateRequest = 
                { ID: media.id, score: albumUpdateRequest.score, source: albumUpdateRequest.source };

            if (albumUpdateRequest.removeTagIDs !== undefined || albumUpdateRequest.addTagIDs !== undefined) {
                let tags: Tag[] = [...media.tags];
                let newTagIDs: number[] = [];

                tags.forEach(tag => {
                    if (!albumUpdateRequest.removeTagIDs?.find(tID => tID === tag.id)) {
                        newTagIDs.push(tag.id);
                    }
                });

                albumUpdateRequest.addTagIDs?.forEach(tagID => {
                    if (!newTagIDs.find(tID_1 => tID_1 === tagID)) {
                        newTagIDs.push(tagID);
                    }
                });

                mediaUpdateRequest.tagIDs = newTagIDs;
            }
            return mediaUpdateRequest;
        });
    }

    const updateAllMedia = async (mediaUpdateRequests: IMediaUpdateRequest[]): Promise<Media[]> => {
        return Promise.all(mediaUpdateRequests.map(update));
    }

    const { isLoading, error, result, resolve: updateMedia, reset } = usePromise(() => 
        updateAllMedia(generateMediaUpdateRequests(albumUpdateRequest, mediaList)));

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
            title={`Editing Media (${mediaList.length})`}
            isShown={isShown} 
            isLoading={isLoading} 
            errorMessage={error?.message} 
            onClose={onClose} 
            onSave={updateMedia}>
            <AlbumUpdateForm 
                showSource={false}
                showArtist={false}
                showCategory={false}
                request={albumUpdateRequest} 
                onChange={setAlbumUpdateRequest} />
        </BaseEditModal>
    );
}
