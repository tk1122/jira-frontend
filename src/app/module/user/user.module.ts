import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './component/user/user.component';
import { StoreModule } from '@ngrx/store';
import * as fromUser from './user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './user.effects';


@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducer),
    EffectsModule.forFeature([UserEffects]),
  ]
})
export class UserModule { }
