import { IKeyBasedAPI } from "../../types";

export default abstract class BrowserStorageAPI implements IKeyBasedAPI {

    Storage: Storage;

    constructor(storage: Storage) {
        this.Storage = storage;
    }

    get<T>(key: string): Promise<T> {
        let storage = this.Storage.getItem(key);
        if (storage === null) {
            throw Error("No Data.");
        }
        return Promise.resolve(JSON.parse(storage));
    }

    set(key: string, data: any): Promise<void> {
        this.Storage.setItem(key, JSON.stringify(data));
        return Promise.resolve(data);
    }
}
