import { Interceptable } from './HttpInterceptor.interface';
import { Injectable, Inject } from '@angular/core';
import { HttpRequestData, InterceptableHttp } from './HttpInterceptor.interface';
import { Response,Request, RequestOptions, RequestOptionsArgs, Http, ConnectionBackend } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';


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


export interface InterceptableHttp extends Http {
    _interceptors: PrePostInterceptors;
    _interceptRequest(data: HttpRequestData): HttpRequestData;
    _interceptResponse(response: Observable<Response>): Observable<Response>
}

export interface PrePostInterceptors {
    pre: RequestInterceptor[];
    post: ResponseInterceptor[];
}

@Injectable()
export class InterceptableHttpService extends Http implements InterceptableHttp {
    protected _backend: ConnectionBackend;
    protected _defaultOptions: RequestOptions;
    constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions) {
        super(_backend, _defaultOptions);
    }
    _interceptors: PrePostInterceptors = { pre: [], post: [] };

    _interceptRequest(data: HttpRequestData): HttpRequestData {
        return this._interceptors.pre.reduce((d, i) => i(d), data);
    }
    _interceptResponse(response: Observable<Response>): Observable<Response> {
        return this._interceptors.post.reduce((o, i) => o.flatMap(_ => i(o)), response);
    }
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        const req = this._interceptRequest({ url, options });
        return this._interceptResponse(super.request(req.url, req.options));
    }
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        const req = this._interceptRequest({ url, options });
        return this._interceptResponse(super.get(<string>req.url, req.options));
    }
    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        const req = this._interceptRequest({ url, options, body });
        return this._interceptResponse(super.post(<string>req.url, req.body, req.options));
    }
    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        const req = this._interceptRequest({ url, options, body });
        return this._interceptResponse(super.put(<string>req.url, req.body, req.options));
    }
    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        const req = this._interceptRequest({ url, options });
        return this._interceptResponse(super.delete(<string>req.url, req.options));
    }
    patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        const req = this._interceptRequest({ url, options, body });
        return this._interceptResponse(super.patch(<string>req.url, req.body, req.options));
    }
    head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        const req = this._interceptRequest({ url, options });
        return this._interceptResponse(super.head(<string>req.url, req.options));
    }
    options(url: string, options?: RequestOptionsArgs): Observable<Response> {
        const req = this._interceptRequest({ url, options });
        return this._interceptResponse(super.options(<string>req.url, req.options));
    }

}

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    private _preInterceptor = new InterceptableStore<RequestInterceptor>(this.http._interceptors.pre);
    private _postInterceptor = new InterceptableStore<ResponseInterceptor>(this.http._interceptors.post);

    constructor( @Inject(Http) private http: InterceptableHttp) {
    }

    request(): Interceptable<RequestInterceptor> {
        return this._preInterceptor;
    }

    response(): Interceptable<ResponseInterceptor> {
        return this._postInterceptor;
    }

}
export class InterceptableStore<T extends Interceptor<any, any>> implements Interceptable<T> {

    constructor(private store: T[]) {
    }

    addInterceptor(interceptor: T): Interceptable<T> {
        this.store.push(interceptor);
        return this;
    }

    removeInterceptor(interceptor: T): Interceptable<T> {
        this.store.splice(this.store.indexOf(interceptor), 1);
        return this;
    }

    clearInterceptors(interceptors: T[] = []): Interceptable<T> {
        if (interceptors.length > 0) {
            interceptors.forEach(i => this.removeInterceptor(i));
        } else {
            this.store.splice(0);
        }
        return this;
    }

}

