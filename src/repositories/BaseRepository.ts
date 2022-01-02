import { IRepository, IRestAPI, SearchQuery, SearchResponse } from "../types";

export default abstract class BaseRepository<TEntity, TSearchQuery = SearchQuery, TUpdateRequest = TEntity> 
    implements IRepository<TEntity, TSearchQuery, TUpdateRequest> {

    API: IRestAPI;

    constructor(api: IRestAPI) {
        this.API = api;
    }

    abstract add(e: TEntity): Promise<TEntity>;

    abstract get(id: number): Promise<TEntity>;

    abstract search(query: TSearchQuery): Promise<SearchResponse<TEntity>>;

    abstract update(e: TUpdateRequest): Promise<TEntity>;

    abstract delete(e: TEntity): Promise<void>;
}
