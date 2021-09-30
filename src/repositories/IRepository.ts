import ISearchResponse from "../api/ISearchResponse";
import ISearchQuery from "./ISearchQuery";

export default interface IRepository<TEntity> {
    add(e: TEntity): Promise<TEntity>;
    get(id: number): Promise<TEntity>;
    search(query: ISearchQuery): Promise<ISearchResponse>;
    update(e: any): Promise<TEntity>;
    delete(e: TEntity): Promise<void>;
}
