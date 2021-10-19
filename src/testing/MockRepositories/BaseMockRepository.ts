import IRepository from "../../types/IRepository";
import ISearchQuery from "../../types/ISearchQuery";
import ISearchResponse from "../../types/ISearchResponse";

export default abstract class BaseMockRepository<TEntity> implements IRepository<TEntity> {

    entitiesKey: string;
    entities: TEntity[];

    constructor(entitiesKey: string, defaultEntities?: TEntity[]) {
        this.entitiesKey = entitiesKey;

        let entities = this.restoreEntites(this.entitiesKey);
        this.entities = entities ? entities : 
            defaultEntities ? defaultEntities : [];

        this.persistEntities(this.entitiesKey, this.entities);
    }

    restoreEntites(entitiesKey: string): TEntity[] | undefined {
        let entitiesString = sessionStorage.getItem(entitiesKey);
        if (entitiesString) {
            let entities = JSON.parse(entitiesString);
            if (entities) {
                return entities;
            }
        }
        return undefined;
    }

    persistEntities(entitiesKey: string, entities: TEntity[]): void {
        sessionStorage.setItem(entitiesKey, JSON.stringify(entities));
    }

    abstract add(e: TEntity): Promise<TEntity>;

    abstract get(id: number): Promise<TEntity>;

    abstract search(query: ISearchQuery): Promise<ISearchResponse<TEntity>>;
    
    abstract update(e: TEntity): Promise<TEntity>;

    abstract delete(e: TEntity): Promise<void>;
}
