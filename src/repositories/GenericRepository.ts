import Artist from "../types/Artist";
import Category from "../types/Category";
import Tag from "../types/Tag";
import API from "../api/API";
import ISearchResponse from "../types/ISearchResponse";
import IRepository from "../types/IRepository"
import ISearchQuery from "../types/ISearchQuery";

interface IGenericSearchQuery extends ISearchQuery {
    name?: string;
}

export default abstract class GenericRepository<
    TEntity extends Tag | Category | Artist> implements IRepository<TEntity> {

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

    search(query: IGenericSearchQuery): Promise<ISearchResponse<TEntity>> {
        let endpoint = `${this.baseURL}/${this.baseEndpoint}/search?count=${query.count}`;

        if (query.offset) {
            endpoint += `&offset=${query.offset}`
        }

        if (query.name) {
            endpoint += `&name=${query.name}`;
        }

        return API.get<ISearchResponse<TEntity>>(endpoint);
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
