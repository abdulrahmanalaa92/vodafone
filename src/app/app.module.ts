import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TranslateModule,TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpModule, Http} from '@angular/http';
import { APP_INITIALIZER } from '@angular/core';
import { ConfigService } from './config/config.service';
import { environment } from '../environments/environment';
export function CreateTranslateloader(http:Http){
	return new TranslateHttpLoader(http,"i18n/",".json");
}
export function ConfigLoader(configService: ConfigService) {
  return () => configService.load(environment.configFile + 'config.json'); 
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,HttpModule,
    AppRoutingModule,
    TranslateModule.forRoot({loader:{useFactory:(CreateTranslateloader),provide:TranslateLoader,deps:[Http]}})
  ],
  providers: [
     ConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: ConfigLoader,
            deps: [ConfigService],
            multi:true
        }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
