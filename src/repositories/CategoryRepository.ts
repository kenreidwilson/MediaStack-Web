import Category from '../types/Category';
import IAPI from '../types/IAPI';
import GenericRepository from './GenericRepository';

export default class CategoryRepository extends GenericRepository<Category> {
    constructor(api: IAPI) {
        super(api, 'categories');
    }
}
