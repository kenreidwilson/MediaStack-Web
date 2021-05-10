class APINetworkError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "APINetworkError";
    }
}

class APINotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "APINotFoundError";
    }
}

class APIBadRequestError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "APIBadRequestError";
    }
}

class APIUnexpectedResponseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "APIUnexpectedResponseError";
    }
}

export {
    APINetworkError,
    APINotFoundError,
    APIBadRequestError,
    APIUnexpectedResponseError
};
