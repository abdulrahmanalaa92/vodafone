import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TranslateModule,TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpModule, Http} from '@angular/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PhoneValidator } from "./shared/custom-validation.directive";

export function CreateTranslateloader(http:Http){
	return new TranslateHttpLoader(http,"i18n/",".json");
}


@NgModule({
  declarations: [
    AppComponent,
    PhoneValidator
  ],
  imports: [
    BrowserModule,HttpModule,
    FormsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({loader:{useFactory:(CreateTranslateloader),provide:TranslateLoader,deps:[Http]}})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
