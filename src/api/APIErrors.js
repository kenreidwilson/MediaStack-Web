class APINetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = "APINetworkError";
    }
}

class APINotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "APINotFoundError";
    }
}

class APIBadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = "APIBadRequestError";
    }
}

export {
    APINetworkError,
    APINotFoundError,
    APIBadRequestError
};
