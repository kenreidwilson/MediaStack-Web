import Category from "../model/Category";
import ISearchResponse from "../api/ISearchResponse";
import GenericRepository from "./GenericRepository";

interface ICategorySearchResponse extends ISearchResponse {
    categories: Category[]
}

class CategoryRepository extends GenericRepository<Category, ICategorySearchResponse> {
    constructor() {
        super("categories");
    }
}

export type {
    ICategorySearchResponse
}

export {
    CategoryRepository
}
