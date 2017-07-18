import { Http, Response, ConnectionBackend, RequestOptions, RequestOptionsArgs } from '@angular/http'
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";
export class HttpInterceptor extends Http {
    constructor(connectionBackend: ConnectionBackend, options: RequestOptions,private _router:Router) {
        super(connectionBackend, options);
    }
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.request(url, options)); // Here is the error
    }
    intercept(observable: Observable<Response>): Observable<Response> {
        return observable.catch((err, source) => {
            if (err.status == 401 && !_.endsWith(err.url, 'api/auth/login')) {
                this._router.navigate(['/login']);
                return Observable.empty();
            } else {
                return Observable.throw(err);
            }
        });

    }
}