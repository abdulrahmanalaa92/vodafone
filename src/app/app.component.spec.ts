import { InterceptableHttpService } from './Infrastructure/HttpInterceptor.interface';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_INITIALIZER } from '@angular/core';
import { CustomComponentModule } from './custom-component/custom-component.module';
import { LoginComponent } from './login/login.component';
import { environment } from './../environments/environment';
import { ConfigService } from './config/config.service';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

export function CreateTranslateloader(http: Http) {
  return new TranslateHttpLoader(http, "i18n/", ".json");
}
export function ConfigLoader(configService: ConfigService) {
  return () => configService.load(environment.configFile + 'config.json');
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule
          .forRoot({
            loader: {
              useFactory: (CreateTranslateloader),
              provide: TranslateLoader, deps: [Http]
            }
          }),
        FormsModule,
        CustomComponentModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent,
        LoginComponent
      ],
      providers: [
        {
          provide: Http,
          useFactory: (backend, defaultOptions) => new InterceptableHttpService(backend, defaultOptions),
          deps: [XHRBackend, RequestOptions]
        },
        ConfigService,
        {
          provide: APP_INITIALIZER,
          useFactory: ConfigLoader,
          deps: [ConfigService],
          multi: true
        }
      ],

    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));
});
