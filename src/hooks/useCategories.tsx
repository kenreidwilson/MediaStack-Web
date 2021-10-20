import Category from '../types/Category';
import IRepository from '../types/IRepository';
import IGenericSearchQuery from '../types/IGenericSearchQuery';
import CategoryRepository from '../repositories/CategoryRepository';
import useRepository from './useRepository';
import API from '../api/API';

export default function useCategories() {
    const categoryRepository: IRepository<Category, IGenericSearchQuery> = new CategoryRepository(new API());
    return useRepository(categoryRepository);
}
