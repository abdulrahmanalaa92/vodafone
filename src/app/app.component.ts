import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from "./config/config.service";

import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { PhoneValidator } from './shared/custom-validation.directive';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  form: FormGroup;
  // getDataInitilized(){
  //   return this.configService.getConfiguration();
  // }
  constructor(/*private fb: FormBuilder, private configService: ConfigService, translateService: TranslateService*/) {
    // translateService.setDefaultLang('sp');
    // translateService.use('sp');
    // this.form = fb.group({
    //   name: ['', Validators.required],
    //   phone: ['', PhoneValidator]

    //});
  }
}
