import Album from "../types/Album";
import Tag from "../types/Tag";
import API from "../api/API";
import ISearchResponse from "../api/ISearchResponse";
import { IGenericSearchQuery } from "./GenericRepository";
import IRepository from "./IRepository";
import { IMediaUpdateRequest, MediaRepository } from "./MediaRepository";
import ISearchQuery from "./ISearchQuery";

interface IAlbumSearchResponse extends ISearchResponse {
    albums: Album[];
}

interface IAlbumUpdateRequest {
    albumID: number;
    addTagIDs?: number[];
    removeTagIDs?: number[];
    source?: string;
    score?: number;
    categoryId? : number;
    artistId?: number;
}

interface IAlbumSearchQuery extends ISearchQuery {
    name?: string,
    artistId?: number
}

class AlbumRepository implements IRepository<Album> {

    baseURL = `${process.env.REACT_APP_API}`;

    add(album: Album): Promise<Album> {
        return API.post<Album>(`${this.baseURL}/albums?name=${album.name}&artistId=${album.artistID}`);
    }

    get(id: number): Promise<Album> {
        return API.get<Album>(`${this.baseURL}/albums?id=${id}`);
    }

    search(query: IAlbumSearchQuery): Promise<IAlbumSearchResponse> {
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

        return API.get<IAlbumSearchResponse>(endpoint);
    }

    async update(updateRequest: IAlbumUpdateRequest): Promise<Album> {
        let mediaRepository = new MediaRepository();
        const response = await mediaRepository.search({ albumID: updateRequest.albumID, mode: 1, count: 9999 });
        for (const media of response.media) {
            let mediaUpdateRequest: IMediaUpdateRequest = { ID: media.id, score: updateRequest.score, source: updateRequest.source };

            if (updateRequest.removeTagIDs !== undefined || updateRequest.addTagIDs !== undefined) {
                let tags: Tag[] = [...media.tags];
                let newTagIDs: number[] = [];

                tags.forEach(tag => {
                    if (!updateRequest.removeTagIDs?.find(tID => tID === tag.id)) {
                        newTagIDs.push(tag.id);
                    }
                });

                updateRequest.addTagIDs?.forEach(tagID => {
                    if (!newTagIDs.find(tID_1 => tID_1 === tagID)) {
                        newTagIDs.push(tagID);
                    }
                });

                mediaUpdateRequest.tagIDs = newTagIDs;
            }

            await mediaRepository.update(mediaUpdateRequest);
        }
        return await this.get(updateRequest.albumID);
    }

    delete(e: Album): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}

export type {
    IAlbumSearchResponse,
    IAlbumUpdateRequest,
    IAlbumSearchQuery
}

export {
    AlbumRepository
}
