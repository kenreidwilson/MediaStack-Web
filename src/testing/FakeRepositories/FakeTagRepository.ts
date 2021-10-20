import Tag from '../../types/Tag';
import GenericFakeRepository from './GenericFakeRepository';

export default class FakeTagRepository extends GenericFakeRepository<Tag> {

    constructor() {
        super("tags", [
            { name: "tag1", id: 1 },
            { name: "tag2", id: 2 }
        ]);
    };
}
