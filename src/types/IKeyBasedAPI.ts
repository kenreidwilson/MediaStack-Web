export default interface IKeyBasedAPI {
    get<T = void>(key: string): Promise<T>;
    set(key: string, data: any): Promise<void>;
}
