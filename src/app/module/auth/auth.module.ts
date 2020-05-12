import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './auth.effects';
import {LoginComponent} from './component/login/login.component';
import {AuthRoutingModule} from "./auth-routing.module";
import {NzButtonModule, NzCardModule, NzFormModule, NzInputModule} from "ng-zorro-antd";
import {ReactiveFormsModule} from "@angular/forms";
import {SignupComponent} from "./component/signup/signup.component";


@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
    AuthRoutingModule,
    NzButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzCardModule,
  ]
})
export class AuthModule {
}
