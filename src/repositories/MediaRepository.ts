import { IRestAPI, Media, MediaSearchQuery, MediaUpdateRequest, SearchResponse } from '../types';
import BaseRepository from './BaseRepository';

export default class MediaRepository extends BaseRepository<Media, MediaSearchQuery, MediaUpdateRequest> {
    
    baseURL: string = `${process.env.REACT_APP_API}`;

    constructor(api: IRestAPI) {
        super(api);
    }

    add(media: Media): Promise<Media> {
        throw new Error('Method not implemented.');
    }

    get(id: number): Promise<Media> {
        return this.API.get<Media>(`${this.baseURL}/media?id=${id}`);
    }

    search(query: MediaSearchQuery): Promise<SearchResponse<Media>> {
        return this.API.post<SearchResponse<Media>>(`${this.baseURL}/media/search`, query);
    }

    update(updateRequest: MediaUpdateRequest): Promise<Media> {
        return this.API.put<Media>(`${this.baseURL}/media`, updateRequest);
    }

    delete(media: Media): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
