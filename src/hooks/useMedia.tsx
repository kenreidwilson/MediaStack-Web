import Media from '../types/Media';
import IRepository from '../types/IRepository';
import IMediaSearchQuery from '../types/IMediaSearchQuery';
import IMediaUpdateRequest from '../types/IMediaUpdateRequest';
import MediaRepository from '../repositories/MediaRepository';
import useRepository from './useRepository';

export default function useMedia() {
    const mediaRepository: IRepository<Media, IMediaSearchQuery, IMediaUpdateRequest> = new MediaRepository();
    return useRepository(mediaRepository);
}
