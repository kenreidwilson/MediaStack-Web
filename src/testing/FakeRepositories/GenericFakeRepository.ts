import { IKeyBasedAPI, GenericSearchQuery, SearchResponse } from '../../types';
import BaseFakeRepository from './BaseFakeRepository';

export default class GenericFakeRepository<TEntity extends { id: number, name: string }> extends BaseFakeRepository<TEntity>  {

    constructor(api: IKeyBasedAPI, entitiesKey: string, defaultEntities?: TEntity[]) {
        super(api, entitiesKey, defaultEntities);
    }

    search(query: GenericSearchQuery): Promise<SearchResponse<TEntity>> {
        return this.API.get<TEntity[]>(this.entitiesKey)
            .then(entities => {

                if (!query.offset) {
                    query.offset = 0;
                }
        
                if (!query.count) {
                    query.count = 5;
                }

                if (query.fuzzyName) {
                    entities = entities.filter(e => !query.fuzzyName || e.name.indexOf(query.fuzzyName) !== -1);
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
