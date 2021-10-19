import Category from '../types/Category';
import GenericRepository from './GenericRepository';

export default class CategoryRepository extends GenericRepository<Category> {
    constructor() {
        super('categories');
    }
}
