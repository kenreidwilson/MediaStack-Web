import IKeyBasedAPI from '../../types/IKeyBasedAPI';
import IRepository from '../../types/IRepository';
import ISearchQuery from '../../types/ISearchQuery';
import ISearchResponse from '../../types/ISearchResponse';

export default abstract class BaseFakeRepository<
    TEntity extends { id: number }, 
    TSearchQuery = ISearchQuery, TUpdateRequest = TEntity> 
        implements IRepository<TEntity, TSearchQuery, TUpdateRequest> {

    API: IKeyBasedAPI;
    entitiesKey: string;

    constructor(api: IKeyBasedAPI, entitiesKey: string, defaultEntities?: TEntity[]) {

        this.entitiesKey = entitiesKey;
        this.API = api;

        try {
            this.API.get<TEntity[]>(this.entitiesKey);
        } catch (_) {
            this.API.set(this.entitiesKey, defaultEntities);
        }
    }

    add(e: TEntity): Promise<TEntity> {
        return this.API.get<TEntity[]>(this.entitiesKey)
            .then(entities => {
                let potentialEntity = entities.find(et => et.id === e.id);

                if (!potentialEntity) {
                    entities.push(e);
                    this.API.set(this.entitiesKey, entities).then(_ => e);
                }
                return e;
            });
    }

    get(id: number): Promise<TEntity> {
        return this.API.get<TEntity[]>(this.entitiesKey)
            .then(entities => {
                let potentialEntity = entities.find(e => e.id === id);

                if (!potentialEntity) {
                    throw new Error(`No Entity found with ID: ${id}`);
                }

                return potentialEntity;
            });
    }

    abstract search(query: TSearchQuery): Promise<ISearchResponse<TEntity>>;
    
    abstract update(e: TUpdateRequest): Promise<TEntity>;

    delete(e: TEntity): Promise<void> {
        return this.API.get<TEntity[]>(this.entitiesKey)
            .then(entities => {
                return this.API.set(this.entitiesKey, entities.filter(et => et.id !== e.id));
            });
    }
}
