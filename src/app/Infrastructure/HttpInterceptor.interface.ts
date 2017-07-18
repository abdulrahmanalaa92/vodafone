import { Interceptable } from './HttpInterceptor.interface';
import { Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
export interface HttpInterceptor {
    request(): Interceptable<RequestInterceptor>;
    response(): Interceptable<ResponseInterceptor>;
}
export interface Interceptor<T, D> {
    (data: T): D;
}
export type RequestInterceptor = Interceptor<HttpRequestData, HttpRequestData>;
export type ResponseInterceptor = Interceptor<Observable<Response>, Observable<Response>>;

export interface Interceptable<T extends Interceptor<any, any>> {
    addInterceptor(interceptor: T): Interceptable<T>;
    removeInterceptor(interceptor: T): Interceptable<T>;
    clearInterceptors(interceptors?: T[]): Interceptable<T>;
}

export interface HttpRequestData {
    url: string | Request;
    options?: RequestOptionsArgs;
    body?: any;
    cancelRequest?: boolean;
}