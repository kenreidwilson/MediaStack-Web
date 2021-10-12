import Category from "../types/Category";
import ISearchResponse from "../types/ISearchResponse";
import GenericRepository from "./GenericRepository";

class CategoryRepository extends GenericRepository<Category> {
    constructor() {
        super("categories");
    }
}

export {
    CategoryRepository
}
