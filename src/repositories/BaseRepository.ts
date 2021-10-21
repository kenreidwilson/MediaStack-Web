import IRestAPI from "../types/IRestAPI";
import IRepository from "../types/IRepository";
import ISearchQuery from "../types/ISearchQuery";
import ISearchResponse from "../types/ISearchResponse";

export default abstract class BaseRepository<TEntity, TSearchQuery = ISearchQuery, TUpdateRequest = TEntity> 
    implements IRepository<TEntity, TSearchQuery, TUpdateRequest> {

    API: IRestAPI;

    constructor(api: IRestAPI) {
        this.API = api;
    }

    abstract add(e: TEntity): Promise<TEntity>;

    abstract get(id: number): Promise<TEntity>;

    abstract search(query: TSearchQuery): Promise<ISearchResponse<TEntity>>;

    abstract update(e: TUpdateRequest): Promise<TEntity>;

    abstract delete(e: TEntity): Promise<void>;
}
