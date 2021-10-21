import Category from '../types/Category';
import IRestAPI from '../types/IRestAPI';
import GenericRepository from './GenericRepository';

export default class CategoryRepository extends GenericRepository<Category> {
    constructor(api: IRestAPI) {
        super(api, 'categories');
    }
}
