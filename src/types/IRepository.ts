import ISearchResponse from "./ISearchResponse";
import ISearchQuery from "./ISearchQuery";

export default interface IRepository<TEntity, TSearchQuery extends ISearchQuery = ISearchQuery, TUpdateData = TEntity> {
    add(e: TEntity): Promise<TEntity>;
    get(id: number): Promise<TEntity>;
    search(query: TSearchQuery): Promise<ISearchResponse<TEntity>>;
    update(e: TUpdateData): Promise<TEntity>;
    delete(e: TEntity): Promise<void>;
}
