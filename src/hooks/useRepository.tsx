import { IRepository, SearchQuery } from "../types";

export default function useRepository<TEntity, TSearchQuery extends SearchQuery = SearchQuery, TUpdateData = TEntity>
    (repository: IRepository<TEntity, TSearchQuery, TUpdateData>) {
    
        return {
            add: (entity: TEntity) => repository.add(entity), 
            get: (id: number) => repository.get(id), 
            search: (query: TSearchQuery) => repository.search(query),
            update: (updateData: TUpdateData) => repository.update(updateData),
            delete: (entity: TEntity) => repository.delete(entity)
        };
}
