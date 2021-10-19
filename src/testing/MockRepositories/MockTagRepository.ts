import Tag from '../../types/Tag';
import GenericMockRepository from './GenericMockRepository';

export default class MockTagRepository extends GenericMockRepository<Tag> {

    constructor() {
        super("tags", [
            { name: "asdf", id: 1 },
            { name: "asdf2", id: 2 }
        ]);
    };
}
