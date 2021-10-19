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

    add(e: TEntity): Promise<TEntity> {
        try {
            return this.get(e.id);
        }
        catch (_) {
            this.entities.push(e);
            this.persistEntities(this.entitiesKey, this.entities);
            return Promise.resolve(e);
        }
    }

    get(id: number): Promise<TEntity> {

        let potentialEntity = this.entities.find(e => e.id === id);

        if (!potentialEntity) {
            throw new Error(`No Entity found with ID: ${id}`);
        }

        return Promise.resolve(potentialEntity);
    }

    search(query: IGenericSearchQuery): Promise<ISearchResponse<TEntity>> {

        if (!query.offset) {
            query.offset = 0;
        }

        if (!query.count) {
            query.count = 5;
        }

        let entities = this.entities;
        if (query.name) {
            entities = entities.filter(e => e.name === query.name);
        }

        let responeData = entities.slice(query.offset).slice(0, query.count);
        return Promise.resolve({
            data: responeData,
            total: entities.length,
            count: responeData.length,
            offset: query.offset
        });

    }

    update(e: TEntity): Promise<TEntity> {
        return this.get(e.id)
            .then(foundTag => {
                this.entities = this.entities.filter(t => t !== foundTag);
                this.entities.push(e);
                this.persistEntities(this.entitiesKey, this.entities);
                return foundTag;
            });
    }

    delete(e: TEntity): Promise<void> {
        return this.get(e.id)
            .then(foundTag => {
                this.entities = this.entities.filter(t => t !== foundTag);
                this.persistEntities(this.entitiesKey, this.entities);
            });
    }
}
