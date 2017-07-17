import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from "./config/config.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private configService: ConfigService,translateService:TranslateService) {
    translateService.setDefaultLang('sp');
   translateService.use('sp')
  }
  webApiBaseUrl: string;
  anyMethod() {
    this.webApiBaseUrl =
      this.configService.getConfiguration().webApiBaseUrl
  }
}
