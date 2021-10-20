import Media from '../types/Media';
import ISearchResponse from '../types/ISearchResponse';
import IMediaSearchQuery from '../types/IMediaSearchQuery';
import IMediaUpdateRequest from '../types/IMediaUpdateRequest';
import BaseRepository from './BaseRepository';
import IAPI from '../types/IAPI';

export default class MediaRepository extends BaseRepository<Media, IMediaSearchQuery, IMediaUpdateRequest> {
    
    baseURL: string = `${process.env.REACT_APP_API}`;

    constructor(api: IAPI) {
        super(api);
    }

    add(media: Media): Promise<Media> {
        throw new Error('Method not implemented.');
    }

    get(id: number): Promise<Media> {
        return this.API.get<Media>(`${this.baseURL}/media?id=${id}`);
    }

    getFileURL(media: Media) {
        return `${this.baseURL}/media/file?id=${media.id}`;
    }

    search(query: IMediaSearchQuery): Promise<ISearchResponse<Media>> {
        return this.API.post<ISearchResponse<Media>>(`${this.baseURL}/media/search`, query);
    }

    update(updateRequest: IMediaUpdateRequest): Promise<Media> {
        return this.API.put<Media>(`${this.baseURL}/media`, updateRequest);
    }

    delete(media: Media): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
