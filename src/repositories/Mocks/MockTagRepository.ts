import Tag from '../../types/Tag';
import IRepository from '../../types/IRepository';
import IGenericSearchQuery from '../../types/IGenericSearchQuery';
import ISearchResponse from '../../types/ISearchResponse';

export default class MockTagRepository implements IRepository<Tag, IGenericSearchQuery> {

    tags: Tag[];

    constructor() {
        this.tags = [
            { name: 'asdf', id: 1 },
            { name: 'asdf2', id: 2 }
        ];
    }

    add(tag: Tag): Promise<Tag> {
        return this.get(tag.id)
            .catch(() => {
                this.tags.push(tag);
                return tag
            });
    }

    get(id: number): Promise<Tag> {
        let potentialTag = this.tags.find(t => t.id == id);

        if (!potentialTag) {
            throw new Error('Tag not found.');
        }
        
        return Promise.resolve(potentialTag);
    }

    search(query: IGenericSearchQuery): Promise<ISearchResponse<Tag>> {

        if (!query.offset) {
            query.offset = 0;
        }

        let foundTags = this.tags.filter(t => t.id == 0);
        let responeData = foundTags.slice(query.offset).slice(0, query.count);
        return Promise.resolve({
            data: responeData,
            total: foundTags.length,
            count: responeData.length,
            offset: query.offset
        });

    }

    update(tag: Tag): Promise<Tag> {
        return this.get(tag.id)
            .then(foundTag => {
                this.tags = this.tags.filter(t => t !== foundTag);
                this.tags.push(tag);
                return foundTag;
            });
    }

    delete(tag: Tag): Promise<void> {
        return this.get(tag.id)
            .then(foundTag => {
                this.tags = this.tags.filter(t => t !== foundTag);
            });
    }
}
