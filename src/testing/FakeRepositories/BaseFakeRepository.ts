import ISearchQuery from '../../types/ISearchQuery';
import ISearchResponse from '../../types/ISearchResponse';
import FakeAPI from '../FakeAPI';
import BaseRepository from '../../repositories/BaseRepository';

export default abstract class BaseFakeRepository<
    TEntity extends { id: number }, 
    TSearchQuery = ISearchQuery, TUpdateRequest = TEntity> 
        extends BaseRepository<TEntity, TSearchQuery, TUpdateRequest> {

    entitiesKey: string;

    constructor(entitiesKey: string, defaultEntities?: TEntity[]) {

        super(new FakeAPI());

        this.entitiesKey = entitiesKey;

        try {
            this.API.get<TEntity[]>(this.entitiesKey);
        } catch (_) {
            this.API.post(this.entitiesKey, defaultEntities);
        }
    }

    add(e: TEntity): Promise<TEntity> {
        return this.API.get<TEntity[]>(this.entitiesKey)
            .then(entities => {
                let potentialEntity = entities.find(et => et.id === e.id);

                if (!potentialEntity) {
                    entities.push(e);
                    return this.API.post<TEntity[]>(this.entitiesKey, entities).then(_ => e);
                } else {
                    return e;
                }
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
                return this.API.put(this.entitiesKey, entities.filter(et => et.id !== e.id));
            });
    }
}
