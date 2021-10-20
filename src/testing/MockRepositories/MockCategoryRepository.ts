import Category from '../../types/Category';
import GenericMockRepository from './GenericMockRepository';

export default class MockCategoryRepository extends GenericMockRepository<Category> {

    constructor() {
        super("categories", [
            { name: "category1", id: 1 },
            { name: "category2", id: 2 }
        ]);
    };
}
