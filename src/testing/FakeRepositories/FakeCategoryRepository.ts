import Category from '../../types/Category';
import GenericFakeRepository from './GenericFakeRepository';

export default class FakeCategoryRepository extends GenericFakeRepository<Category> {

    constructor() {
        super("categories", [
            { name: "category1", id: 1 },
            { name: "category2", id: 2 }
        ]);
    };
}
