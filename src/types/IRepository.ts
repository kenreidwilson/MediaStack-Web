import ISearchResponse from "./ISearchResponse";
import ISearchQuery from "./ISearchQuery";

export default interface IRepository<TEntity> {
    add(e: TEntity): Promise<TEntity>;
    get(id: number): Promise<TEntity>;
    search(query: ISearchQuery): Promise<ISearchResponse<TEntity>>;
    update(e: any): Promise<TEntity>;
    delete(e: TEntity): Promise<void>;
}
