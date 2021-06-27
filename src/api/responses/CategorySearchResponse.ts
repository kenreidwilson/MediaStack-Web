import Category from "../../model/Category";

export default interface CategoriesSearchResponse {
    categories: Category[],
    count: number,
    total: number,
    offset: number
}