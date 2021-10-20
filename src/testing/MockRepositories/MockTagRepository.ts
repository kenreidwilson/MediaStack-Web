import Tag from '../../types/Tag';
import GenericMockRepository from './GenericMockRepository';

export default class MockTagRepository extends GenericMockRepository<Tag> {

    constructor() {
        super("tags", [
            { name: "tag1", id: 1 },
            { name: "tag2", id: 2 }
        ]);
    };
}
