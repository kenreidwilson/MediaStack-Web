import { Artist, Category, GenericSearchQuery, IRestAPI, SearchResponse, Tag } from '../types';
import BaseRepository from './BaseRepository';
import { APIBadRequestError } from '../api/APIErrors';

export default abstract class GenericRepository<
    TEntity extends Tag | Category | Artist> extends BaseRepository<TEntity> {

    baseEndpoint: string;
    baseURL: string = `${process.env.REACT_APP_API}`;

    constructor(api: IRestAPI, baseEndpoint: string) {
        super(api);
        this.baseEndpoint = baseEndpoint;
    }

    add(e: TEntity): Promise<TEntity> {
        if (e.name === undefined) {
            throw new APIBadRequestError("Bad Request: Invalid Name");
        }
        return this.API.post<TEntity>(`${this.baseURL}/${this.baseEndpoint}?name=${e.name}`);
    }
    
    get(id: number): Promise<TEntity> {
        return this.API.get<TEntity>(`${this.baseURL}/${this.baseEndpoint}?id=${id}`);
    }

    search(query: GenericSearchQuery): Promise<SearchResponse<TEntity>> {
        let endpoint = `${this.baseURL}/${this.baseEndpoint}/search?count=${query.count}`;

        if (query.offset) {
            endpoint += `&offset=${query.offset}`
        }

        if (query.fuzzyName) {
            endpoint += `&fuzzyname=${query.fuzzyName}`;
        }

        return this.API.get<SearchResponse<TEntity>>(endpoint);
    }

    update(e: TEntity): Promise<TEntity> {
        if (e.name === undefined) {
            throw new APIBadRequestError("Bad Request: Invalid Name");
        }
        return this.API.put<TEntity>(`${this.baseURL}/${this.baseEndpoint}?id=${e.id}&name=${e.name}`);
    }

    delete(e: TEntity): Promise<void> {
        return this.API.delete(`${this.baseURL}/${this.baseEndpoint}?id=${e.id}`);
    }
}
