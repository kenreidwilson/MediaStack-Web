import Axios from 'axios';
import { APINetworkError, APINotFoundError, APIBadRequestError, APIUnexpectedResponseError } from './APIErrors';
import BaseResponse from './IBaseResponse';

class API {
    static get<T>(url: string): Promise<T> {
        return Axios.get<BaseResponse<T>>(url)
        .then(response => {
            if (response.status === 200) {
                return response.data.data;
            }
            throw new APIUnexpectedResponseError(`Invalid response status: ${response.status}`);
        }).catch(error => {
            if (error.response === undefined) {
                throw new APINetworkError("API sent no response.");
            }
            switch (error.response.status) {
                case (404):
                    throw new APINotFoundError(error.response.data.message);
                default:
                    throw new APIUnexpectedResponseError("Server responded unexpectedly.");
            }
        });
    }

    static post<T>(url: string, data?: any): Promise<T> {
        return Axios.post<BaseResponse<T>>(url, data)
        .then(response => {
            if (response.status === 201 || response.status === 200) {
                return response.data.data;
            }
            throw new APIUnexpectedResponseError(`Invalid response status: ${response.status}`);
        })
        .catch(error => {
            if (error.response === undefined) {
                throw new APINetworkError("API sent no response.");
            }
            switch (error.response.status) {
                case (400):
                    throw new APIBadRequestError(error.response.data.message);
                default:
                    throw new APIUnexpectedResponseError("Server responded unexpectedly.");
            }
        });
    }

    static delete<T>(url: string): Promise<T> {
        return Axios.delete<BaseResponse<T>>(url)
        .then(response => {
            if (response.status === 200) {
                return response.data.data;
            }
            throw new APIUnexpectedResponseError(`Invalid response status: ${response.status}`);
        })
        .catch(error => {
            if (error.response === undefined) {
                throw new APINetworkError("API sent no response.");
            }
            switch (error.response.status) {
                case (404):
                    throw new APINotFoundError(error.response.data.message);
                default:
                    throw new APIUnexpectedResponseError("Server responded unexpectedly.");
            }
        });
    }

    static put<T>(url: string, data?: any): Promise<T> {
        return Axios.put<BaseResponse<T>>(url, data)
        .then(response => {
            if (response.status === 200) {
                return response.data.data;
            }
            throw new APIUnexpectedResponseError(`Invalid response status: ${response.status}`);
        })
        .catch(error => {
            if (error.response === undefined) {
                throw new APINetworkError("API sent no response.");
            }
            switch (error.response.status) {
                case (400):
                    throw new APIBadRequestError(error.response.data.message);
                default:
                    throw new APIUnexpectedResponseError("Server responded unexpectedly.");
            }
        });
    }
}

export default API;
