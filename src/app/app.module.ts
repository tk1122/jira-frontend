import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './component/app/app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {metaReducers} from './app.reducer';
import {AuthModule} from "./module/auth/auth.module";
import {httpInterceptorProviders} from "../shared/http-interceptor";
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { UnauthorizedAccessComponent } from './component/unauthorized-access/unauthorized-access.component';
import {NzButtonModule, NzResultModule} from "ng-zorro-antd";
import { SignupComponent } from './module/auth/component/signup/signup.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    UnauthorizedAccessComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AuthModule,
    AppRoutingModule,
    NzResultModule,
    NzButtonModule
  ],
  providers: [{provide: NZ_I18N, useValue: en_US}, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
