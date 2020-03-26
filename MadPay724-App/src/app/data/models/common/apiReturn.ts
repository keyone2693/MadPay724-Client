export interface ApiReturn<T> {
    status: boolean;
    message: string;
    result: T;
}
