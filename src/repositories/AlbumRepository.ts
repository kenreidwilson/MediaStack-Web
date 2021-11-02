import Album from '../types/Album';
import IRestAPI from '../types/IRestAPI';
import ISearchResponse from '../types/ISearchResponse';
import IAlbumSearchQuery from '../types/IAlbumSearchQuery';
import IAlbumUpdateRequest from '../types/IAlbumUpdateRequest';
import IMediaUpdateRequest from '../types/IMediaUpdateRequest';
import { manageTags } from '../repositories/DomainHelpers';
import MediaRepository from './MediaRepository';
import BaseRepository from './BaseRepository';

export default class AlbumRepository extends BaseRepository<Album, IAlbumSearchQuery, IAlbumUpdateRequest> {

    baseURL: string = `${process.env.REACT_APP_API}`;

    constructor(api: IRestAPI) {
        super(api);
    }

    add(album: Album): Promise<Album> {
        return this.API.post<Album>(`${this.baseURL}/albums?name=${album.name}&artistId=${album.artistID}`);
    }

    get(id: number): Promise<Album> {
        return this.API.get<Album>(`${this.baseURL}/albums?id=${id}`);
    }

    search(query: IAlbumSearchQuery): Promise<ISearchResponse<Album>> {
        let endpoint = `${this.baseURL}/albums/search?count=${query.count}`;

        if (query.offset) {
            endpoint += `&offset=${query.offset}`
        }

        if (query.name) {
            endpoint += `&name=${query.name}`;
        }

        if (query.artistId) {
            endpoint += `&artistid=${query.artistId}`;
        }

        return this.API.get<ISearchResponse<Album>>(endpoint);
    }

    async update(updateRequest: IAlbumUpdateRequest): Promise<Album> {
        let mediaRepository = new MediaRepository(this.API);
        const response = await mediaRepository.search({ albumID: updateRequest.ID, mode: 1, count: 9999 });
        for (const media of response.data) {
            let mediaUpdateRequest: IMediaUpdateRequest = { ID: media.id, score: updateRequest.score, source: updateRequest.source };

            if (updateRequest.removeTagIDs !== undefined || updateRequest.addTagIDs !== undefined) {
                mediaUpdateRequest.tagIDs = manageTags(
                    media.tags, 
                    updateRequest.addTagIDs?.map(tid => ({ name: '', id: tid })),
                    updateRequest.removeTagIDs?.map(tid => ({ name: '', id: tid }))
                    ).map(t => t.id);
            }

            await mediaRepository.update(mediaUpdateRequest);
        }
        return await this.get(updateRequest.ID);
    }

    delete(e: Album): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}
