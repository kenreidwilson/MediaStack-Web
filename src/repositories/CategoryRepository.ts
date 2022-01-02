import { Category, IRestAPI } from '../types';
import GenericRepository from './GenericRepository';

export default class CategoryRepository extends GenericRepository<Category> {
    constructor(api: IRestAPI) {
        super(api, 'categories');
    }
}
