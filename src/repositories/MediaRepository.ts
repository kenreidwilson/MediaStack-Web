import API from "../api/API";
import ISearchResponse from "../types/ISearchResponse";
import Media from "../types/Media";
import IRepository from "../types/IRepository";
import ISearchQuery from "../types/ISearchQuery";

interface IMediaSearchQuery extends ISearchQuery {
    categoryID?: number;
    blacklistCategoryIDs?: number[];
    artistID?: number;
    blacklistArtistsIDs?: number[];
    albumID?: number;
    blacklistAlbumIDs?: number[];
    whitelistTagIDs?: number[];
    blacklistTagIDs?: number[];
    score?: number;
    lessThanScore?: number;
    greaterThanScore?: number;
    sortBy?: string;
    type?: number;
    mode?: number;
}

interface IMediaUpdateRequest {
    ID: number;
    categoryID?: number;
    artistID?: number;
    albumID?: number;
    tagIDs?: number[];
    score?: number;
    source?: string;
    albumOrder?: number;
}

class MediaRepository implements IRepository<Media, IMediaSearchQuery, IMediaUpdateRequest> {

    baseURL = `${process.env.REACT_APP_API}`;
    
    add(media: Media): Promise<Media> {
        throw new Error("Method not implemented.");
    }

    get(id: number): Promise<Media> {
        return API.get<Media>(`${this.baseURL}/media?id=${id}`);
    }

    getFileURL(media: Media) {
        return `${this.baseURL}/media/file?id=${media.id}`;
    }

    search(query: IMediaSearchQuery): Promise<ISearchResponse<Media>> {
        return API.post<ISearchResponse<Media>>(`${this.baseURL}/media/search`, query);
    }

    update(updateRequest: IMediaUpdateRequest): Promise<Media> {
        return API.put<Media>(`${this.baseURL}/media`, updateRequest);
    }

    delete(media: Media): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export type {
    IMediaSearchQuery,
    IMediaUpdateRequest
}

export {
    MediaRepository
}
