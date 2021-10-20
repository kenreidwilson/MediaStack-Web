import Category from '../../types/Category';
import GenericFakeRepository from './GenericFakeRepository';
import { SeedCategories } from '../SeedData/SeedCategories';

export default class FakeCategoryRepository extends GenericFakeRepository<Category> {

    constructor() {
        super("categories", SeedCategories);
    };
}
