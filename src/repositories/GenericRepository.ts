import Tag from '../types/Tag';
import Artist from '../types/Artist';
import Category from '../types/Category';
import ISearchResponse from '../types/ISearchResponse';
import IGenericSearchQuery from '../types/IGenericSearchQuery';
import BaseRepository from './BaseRepository';
import IRestAPI from '../types/IRestAPI';

export default abstract class GenericRepository<
    TEntity extends Tag | Category | Artist> extends BaseRepository<TEntity> {

    baseEndpoint: string;
    baseURL: string = `${process.env.REACT_APP_API}`;

    constructor(api: IRestAPI, baseEndpoint: string) {
        super(api);
        this.baseEndpoint = baseEndpoint;
    }

    add(e: TEntity): Promise<TEntity> {
        return this.API.post<TEntity>(`${this.baseURL}/${this.baseEndpoint}?name=${e.name}`);
    }
    
    get(id: number): Promise<TEntity> {
        return this.API.get<TEntity>(`${this.baseURL}/${this.baseEndpoint}?id=${id}`);
    }

    search(query: IGenericSearchQuery): Promise<ISearchResponse<TEntity>> {
        let endpoint = `${this.baseURL}/${this.baseEndpoint}/search?count=${query.count}`;

        if (query.offset) {
            endpoint += `&offset=${query.offset}`
        }

        if (query.name) {
            endpoint += `&name=${query.name}`;
        }

        return this.API.get<ISearchResponse<TEntity>>(endpoint);
    }

    update(e: TEntity): Promise<TEntity> {
        return this.API.put<TEntity>(`${this.baseURL}/${this.baseEndpoint}`, e);
    }

    delete(e: TEntity): Promise<void> {
        return this.API.delete(`${this.baseURL}/${this.baseEndpoint}?id=${e.id}`);
    }
}
