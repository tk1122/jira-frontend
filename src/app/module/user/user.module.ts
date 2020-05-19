import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './component/user/user.component';
import {StoreModule} from '@ngrx/store';
import * as fromUser from './user.reducer';
import {EffectsModule} from '@ngrx/effects';
import {RoleEffects, UserEffects} from './user.effects';
import { UserListComponent } from './component/user-list/user-list.component';
import {NzIconModule, NzTableModule} from "ng-zorro-antd";
import {SharedComponentModule} from "../shared-component/shared-component.module";


@NgModule({
  declarations: [UserComponent, UserListComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.userReducer),
    StoreModule.forFeature(fromUser.roleFeatureKey, fromUser.roleReducer),
    EffectsModule.forFeature([UserEffects, RoleEffects]),
    NzTableModule,
    NzIconModule,
    SharedComponentModule,
  ]
})
export class UserModule {
}
