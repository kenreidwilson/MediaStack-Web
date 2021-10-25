import IKeyBasedAPI from '../../types/IKeyBasedAPI';
import IGenericSearchQuery from '../../types/IGenericSearchQuery';
import ISearchResponse from '../../types/ISearchResponse';
import BaseFakeRepository from './BaseFakeRepository';

export default class GenericFakeRepository<TEntity extends { id: number, name: string }> extends BaseFakeRepository<TEntity>  {

    constructor(api: IKeyBasedAPI, entitiesKey: string, defaultEntities?: TEntity[]) {
        super(api, entitiesKey, defaultEntities);
    }

    search(query: IGenericSearchQuery): Promise<ISearchResponse<TEntity>> {
        return this.API.get<TEntity[]>(this.entitiesKey)
            .then(entities => {

                if (!query.offset) {
                    query.offset = 0;
                }
        
                if (!query.count) {
                    query.count = 5;
                }

                if (query.fuzzyname) {
                    entities = entities.filter(e => e.name === query.fuzzyname);
                }

                let responeData = entities.slice(query.offset).slice(0, query.count);

                return {
                    data: responeData,
                    total: entities.length,
                    count: responeData.length,
                    offset: query.offset
                };
        });
    }

    update(e: TEntity): Promise<TEntity> {
        return this.API.get<TEntity[]>(this.entitiesKey)
            .then(entities => {
                entities = entities.filter(et => et.id !== e.id);
                entities.push(e);
                this.API.set(this.entitiesKey, entities).then(_ => e);
                return e;
            });
    }
}
