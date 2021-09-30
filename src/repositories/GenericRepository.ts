import Artist from "../model/Artist";
import Category from "../model/Category";
import Tag from "../model/Tag";
import API from "../api/API";
import ISearchResponse from "../api/ISearchResponse";
import IRepository from "./IRepository"
import ISearchQuery from "./ISearchQuery";

interface IGenericSearchQuery extends ISearchQuery {
    name?: string;
}

export default abstract class GenericRepository<
    TEntity extends Tag | Category | Artist,
    TSearchResponse extends ISearchResponse> implements IRepository<TEntity> {

    baseURL = `${process.env.REACT_APP_API}`;
    baseEndpoint: string;

    constructor(baseEndpoint: string) {
        this.baseEndpoint = baseEndpoint;
    }

    add(e: TEntity): Promise<TEntity> {
        return API.post<TEntity>(`${this.baseURL}/${this.baseEndpoint}?name=${e.name}`);
    }
    
    get(id: number): Promise<TEntity> {
        return API.get<TEntity>(`${this.baseURL}/${this.baseEndpoint}?id=${id}`);
    }

    search(query: IGenericSearchQuery): Promise<TSearchResponse> {
        let endpoint = `${this.baseURL}/${this.baseEndpoint}/search?count=${query.count}`;

        if (query.offset) {
            endpoint += `&offset=${query.offset}`
        }

        if (query.name) {
            endpoint += `&name=${query.name}`;
        }

        return API.get<TSearchResponse>(endpoint);
    }

    update(e: TEntity): Promise<TEntity> {
        return API.put<TEntity>(`${this.baseURL}/${this.baseEndpoint}`, e);
    }

    delete(e: TEntity): Promise<void> {
        return API.delete(`${this.baseURL}/${this.baseEndpoint}?id=${e.id}`);
    }
}

export type {
    IGenericSearchQuery
};
