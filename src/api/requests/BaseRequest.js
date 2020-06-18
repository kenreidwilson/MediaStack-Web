class BaseRequest {
    constructor() {
        this.baseURL = `${process.env.REACT_APP_API}/api`;
    }

    getURL() {
        throw Error("Method not implemented.");
    }

    getData() {
        return null;
    }
}

export default BaseRequest;
