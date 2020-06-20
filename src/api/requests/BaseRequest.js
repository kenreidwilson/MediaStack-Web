class BaseRequest {
    constructor() {
        this.baseURL = `${process.env.REACT_APP_API}/api`;
    }

    send() {
        throw Error("Request not implemented.");
    }
}

export default BaseRequest;
