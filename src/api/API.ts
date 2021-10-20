import { APINetworkError, APINotFoundError, APIBadRequestError, APIUnexpectedResponseError } from './APIErrors';
import IAPI from '../types/IAPI';
import BaseResponse from '../types/IBaseResponse';
import Axios from 'axios';

export default class API implements IAPI {

    get<T>(endpoint: string): Promise<T> {
        return Axios.get<BaseResponse<T>>(endpoint)
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

    post<T>(endpoint: string, data?: any): Promise<T> {
        return Axios.post<BaseResponse<T>>(endpoint, data)
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

    delete<T>(endpoint: string): Promise<T> {
        return Axios.delete<BaseResponse<T>>(endpoint)
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

    put<T>(endpoint: string, data?: any): Promise<T> {
        return Axios.put<BaseResponse<T>>(endpoint, data)
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
