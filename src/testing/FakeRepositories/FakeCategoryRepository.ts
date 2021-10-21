import Category from '../../types/Category';
import IKeyBasedAPI from '../../types/IKeyBasedAPI';
import GenericFakeRepository from './GenericFakeRepository';
import { SeedCategories } from '../SeedData/SeedCategories';

export default class FakeCategoryRepository extends GenericFakeRepository<Category> {

    constructor(api: IKeyBasedAPI) {
        super(api, "categories", SeedCategories);
    };
}
