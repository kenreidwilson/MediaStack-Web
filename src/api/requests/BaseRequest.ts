abstract class BaseRequest {
    baseURL: string;

    constructor() {
        this.baseURL = `${process.env.REACT_APP_API}`;
    }

    send() {
        throw Error("Request not implemented.");
    }
}

export default BaseRequest;
