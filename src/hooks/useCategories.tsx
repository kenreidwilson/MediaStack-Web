import { CategoryRepository } from "../repositories/CategoryRepository";
import { IGenericSearchQuery } from "../repositories/GenericRepository";
import Category from "../types/Category";
import IRepository from "../types/IRepository";
import useRepository from "./useRepository";

export default function useCategories() {

    const categoryRepository: IRepository<Category, IGenericSearchQuery> = new CategoryRepository();
    return useRepository(categoryRepository);
}
