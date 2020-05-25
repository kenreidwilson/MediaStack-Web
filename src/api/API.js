import { APINetworkError, APINotFoundError, APIBadRequestError } from './APIErrors';

class API {

    static get(request) {
        return fetch(request.getRequestURL())
        .then((response) => {
            switch (response.status) {
                case (404):
                    throw new APINotFoundError("Resource not found.");
                case (200):
                    return response.json();
                default:
                    throw new Error("Server responsed unexpectedly.");
            }
        })
        .then(responseJson => {
            return responseJson['data'];
        }).catch(error => { 
            if (error instanceof TypeError) {
                throw new APINetworkError(error.message);
            } else {
                throw error;
            }
        });
    }
}

export default API;