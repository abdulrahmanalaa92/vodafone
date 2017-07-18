import { Configuration } from './config-model'
import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
@Injectable()
export class ConfigService {
    private config: Configuration;
    constructor(private http: Http) { }
    load(url: string) {
        return new Promise((resolve) => {
            this.http.get(url).map(res => res.json())
                .subscribe(config => {
                    this.config = config;
                    debugger;
                    resolve();
                });
        });
    }
    getConfiguration(): Configuration {
        return this.config;
    }
}