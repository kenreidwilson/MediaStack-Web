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
    constructor(categoryId) {
        super();
        this.categoryId = categoryId
    }

    send() {
        return API.get(`${this.baseURL}/categories/${this.categoryId}/info`)
    }
}

export {
    CategoriesRequest,
    CategoryInfoRequest
}