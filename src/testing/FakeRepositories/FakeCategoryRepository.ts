import { Category, IKeyBasedAPI } from '../../types';
import GenericFakeRepository from './GenericFakeRepository';
import { SeedCategories } from '../SeedData/SeedCategories';

export default class FakeCategoryRepository extends GenericFakeRepository<Category> {

    constructor(api: IKeyBasedAPI) {
        super(api, "categories", SeedCategories);
    };
}
