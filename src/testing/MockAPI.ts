import IAPI from "../types/IAPI";

export default class MockAPI implements IAPI {

    get<T = void>(endpoint: string): Promise<T> {
        let storage = sessionStorage.getItem(endpoint);
        if (storage === null) {
            throw Error("No Data.");
        }
        return Promise.resolve(JSON.parse(storage));
    }

    post<T = void>(endpoint: string, data?: any): Promise<T> {
        return this.put(endpoint, data);
    }

    delete<T = void>(endpoint: string): Promise<T> {
        throw new Error("Method not implemented.");
    }

    put<T = void>(endpoint: string, data?: any): Promise<T> {
        sessionStorage.setItem(endpoint, JSON.stringify(data));
        return Promise.resolve(data);
    }
}
