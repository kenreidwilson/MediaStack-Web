import Tag from '../../types/Tag';
import Category from '../../types/Category';
import Artist from '../../types/Artist';
import IGenericSearchQuery from '../../types/IGenericSearchQuery';
import ISearchResponse from '../../types/ISearchResponse';

import BaseMockRepository from './BaseMockRepository';

export default class GenericMockRepository<TEntity extends Tag | Category | Artist> extends BaseMockRepository<TEntity>  {

    constructor(entitiesKey: string, defaultEntities?: TEntity[]) {
        super(entitiesKey, defaultEntities);
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

                if (query.name) {
                    entities = entities.filter(e => e.name === query.name);
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
                return this.API.put<TEntity[]>(this.entitiesKey, entities).then(_ => e);
            });
    }
}
