import IRepository from '../types/IRepository';
import ISearchQuery from '../types/ISearchQuery';

export default function useRepository<TEntity, TSearchQuery extends ISearchQuery = ISearchQuery, TUpdateData = TEntity>
    (repository: IRepository<TEntity, TSearchQuery, TUpdateData>) {
    
        return {
            add: (entity: TEntity) => repository.add(entity), 
            get: (id: number) => repository.get(id), 
            search: (query: TSearchQuery) => repository.search(query),
            update: (updateData: TUpdateData) => repository.update(updateData),
            delete: (entity: TEntity) => repository.delete(entity)
        };
}
