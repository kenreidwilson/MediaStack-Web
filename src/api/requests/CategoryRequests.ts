import BaseRequest from './BaseRequest'
import API from '../API';

class CategoriesRequest extends BaseRequest {
    constructor() {
        super();
    }

    send() {
        return API.get(`${this.baseURL}/categories`);
    }
}

class CategoryInfoRequest extends BaseRequest {
    categoryId: Number

    constructor(categoryId: Number) {
        super();
        this.categoryId = categoryId
    }

    send() {
        return API.get(`${this.baseURL}/categories/${this.categoryId}`)
    }
}

export {
    CategoriesRequest,
    CategoryInfoRequest
}