<<<<<<< HEAD
import { InterceptableHttpService } from './Infrastructure/HttpInterceptor.interface';
=======
>>>>>>> develop
import { CustomComponentModule } from './custom-component/custom-component.module';
import { InputTextComponent } from './custom-component/input-text/input-text.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import {TranslateModule,TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpModule, Http} from '@angular/http';

export function CreateTranslateloader(http:Http){
	return new TranslateHttpLoader(http,"i18n/",".json");
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
=======
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule, Http } from '@angular/http';
>>>>>>> develop
import { APP_INITIALIZER } from '@angular/core';
import { ConfigService } from './config/config.service';
import { environment } from '../environments/environment';
export function CreateTranslateloader(http: Http) {
  return new TranslateHttpLoader(http, "i18n/", ".json");
}
export function ConfigLoader(configService: ConfigService) {
  return () => configService.load(environment.configFile + 'config.json');
}
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PhoneValidator } from "./shared/custom-validation.directive";
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PhoneValidator
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
<<<<<<< HEAD
    TranslateModule.forRoot({loader:{useFactory:(CreateTranslateloader),provide:TranslateLoader,deps:[Http]}})
    FormsModule,
    ReactiveFormsModule,
    CustomComponentModule,
    TranslateModule.forRoot({ loader: { useFactory: (CreateTranslateloader), provide: TranslateLoader, deps: [Http] } })
  ],
  providers: [
    {
      provide: Http,
      useFactory: (backend, defaultOptions) => new InterceptableHttpService(backend, defaultOptions),
      deps: [XHRBackend, RequestOptions]
    },
=======
    FormsModule,
    ReactiveFormsModule,CustomComponentModule,
    TranslateModule.forRoot({ loader: { useFactory: (CreateTranslateloader), provide: TranslateLoader, deps: [Http] } })
  ],
  providers: [
>>>>>>> develop
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigLoader,
      deps: [ConfigService],
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
