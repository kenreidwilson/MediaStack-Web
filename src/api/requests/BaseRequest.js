class BaseRequest {
    constructor() {
        this.baseURL = "http://localhost:8000/api";
    }

    getRequestURL() {
        throw Error("Method not implemented.");
    }
}

export default BaseRequest;