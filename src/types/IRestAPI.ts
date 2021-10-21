export default interface IRestAPI {
    get<T = void>(endpoint: string): Promise<T>;
    post<T = void>(endpoint: string, data?: any): Promise<T>;
    delete<T = void>(endpoint: string): Promise<T>;
    put<T = void>(endpoint: string, data?: any): Promise<T>;
}
