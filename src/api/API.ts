import { APINetworkError, APINotFoundError, APIBadRequestError, APIUnexpectedResponseError } from './APIErrors';
import Axios from 'axios';

const API_RESPONSE_DATA_KEY = "data";
const API_RESPONSE_MESSAGE_KEY = "message";

class API {

    static get(url: string) {
        return Axios.get(url)
        .then(response => {
            if (response.status === 200) {
                return response.data[API_RESPONSE_DATA_KEY];
            }
            throw { 'response' : { 'status' : response.status }, 'message' : "Invalid response status." };
        }).catch(error => {
            if (typeof error.response === 'undefined') {
                throw new APINetworkError("API sent no response.");
            }
            switch (error.response.status) {
                case (404):
                    throw new APINotFoundError(error.response.data[API_RESPONSE_MESSAGE_KEY]);
                default:
                    throw new APIUnexpectedResponseError("Server responded unexpectedly.");
            }
        });
    }

    static post(url: string, data?: object) {
        return Axios.post(url, data)
        .then(response => {
            if (response.status === 201 || response.status === 200) {
                return response.data[API_RESPONSE_DATA_KEY];
            }
            throw { 'response' : { 'status' : response.status }, 'message' : "Invalid response status." };
        })
        .catch(error => {
            if (typeof error.response === 'undefined') {
                throw new APINetworkError("API sent no response.");
            }
            switch (error.response.status) {
                case (400):
                    throw new APIBadRequestError(error.response.data[API_RESPONSE_MESSAGE_KEY]);
                default:
                    throw new APIUnexpectedResponseError("Server responded unexpectedly.");
            }
        });
    }

    static delete(url: string) {
        return Axios.delete(url)
        .then(response => {
            if (response.status === 200) {
                return response.data[API_RESPONSE_DATA_KEY];
            }
            throw { 'response' : { 'status' : response.status }, 'message' : "Invalid response status." };
        })
        .catch(error => {
            if (typeof error.response === 'undefined') {
                throw new APINetworkError("API sent no response.");
            }
            switch (error.response.status) {
                case (404):
                    throw new APINotFoundError(error.response.data[API_RESPONSE_MESSAGE_KEY]);
                default:
                    throw new APIUnexpectedResponseError("Server responded unexpectedly.");
            }
        });
    }

    static put(url: string, data?: object) {
        return Axios.put(url, data)
        .then(response => {
            if (response.status === 200) {
                return response.data[API_RESPONSE_DATA_KEY];
            }
            throw { 'response' : { 'status' : response.status }, 'message' : "Invalid response status." };
        })
        .catch(error => {
            if (typeof error.response === 'undefined') {
                throw new APINetworkError("API sent no response.");
            }
            switch (error.response.status) {
                case (400):
                    throw new APIBadRequestError(error.response.data[API_RESPONSE_MESSAGE_KEY]);
                default:
                    throw new APIUnexpectedResponseError("Server responded unexpectedly.");
            }
        });
    }
}

export default API;
