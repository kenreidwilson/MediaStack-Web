import BaseRequest from './BaseRequest'
import API from '../API';
import Category from '../../model/Category';
import CategoriesSearchResponseData from '../responses/CategorySearchResponse';

class CategoriesRequest extends BaseRequest {
    send() {
        return API.get<CategoriesSearchResponseData>(`${this.baseURL}/categories/search?count=999`);
    }
}

class CategoryInfoRequest extends BaseRequest {
    categoryId: number

    constructor(categoryId: number) {
        super();
        this.categoryId = categoryId
    }

    send() {
        return API.get<Category>(`${this.baseURL}/categories?id=${this.categoryId}`);
    }
}

export {
    CategoriesRequest,
    CategoryInfoRequest
}