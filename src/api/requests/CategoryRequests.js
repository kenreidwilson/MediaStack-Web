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

export {
    CategoriesRequest
}