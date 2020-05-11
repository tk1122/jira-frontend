import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './auth.effects';
import {LoginComponent} from './component/login/login.component';
import {AuthRoutingModule} from "./auth-routing.module";
import {NzButtonModule} from "ng-zorro-antd";


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
    AuthRoutingModule,
    NzButtonModule
  ]
})
export class AuthModule {
}
