class BaseRequest {
    constructor() {
        this.baseURL = "http://localhost:8000/api";
    }

    getURL() {
        throw Error("Method not implemented.");
    }

    getData() {
        return null;
    }
}

export default BaseRequest;
