import BaseRequest from './BaseRequest'
import API from '../API';
import Category from '../../model/Category';

class CategoriesRequest extends BaseRequest {
    constructor() {
        super();
    }

    send() {
        return API.get<Category[]>(`${this.baseURL}/categories`);
    }
}

class CategoryInfoRequest extends BaseRequest {
    categoryId: number

    constructor(categoryId: number) {
        super();
        this.categoryId = categoryId
    }

    send() {
        return API.get<Category>(`${this.baseURL}/categories/${this.categoryId}`);
    }
}

export {
    CategoriesRequest,
    CategoryInfoRequest
}