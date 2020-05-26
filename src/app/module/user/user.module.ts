import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './component/user/user.component';
import {StoreModule} from '@ngrx/store';
import * as fromUser from './user.reducer';
import {EffectsModule} from '@ngrx/effects';
import {RoleEffects, UserEffects} from './user.effects';
import {UserListComponent} from './component/user-list/user-list.component';
import {
  NzButtonModule,
  NzDescriptionsModule,
  NzFormModule,
  NzGridModule,
  NzIconModule, NzInputModule, NzSelectModule,
  NzTableModule,
  NzTagModule
} from "ng-zorro-antd";
import {SharedComponentModule} from "../shared-component/shared-component.module";
import {UserStatusPipe} from "./pipe/user-status.pipe";
import {UserDetailComponent} from './component/user-detail/user-detail.component';
import {UserGenderPipe} from "./pipe/user-gender.pipe";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [UserComponent, UserListComponent, UserStatusPipe, UserDetailComponent, UserGenderPipe],
  imports: [
    CommonModule,
    UserRoutingModule,
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.userReducer),
    StoreModule.forFeature(fromUser.roleFeatureKey, fromUser.roleReducer),
    EffectsModule.forFeature([UserEffects, RoleEffects]),
    NzTableModule,
    NzIconModule,
    SharedComponentModule,
    NzGridModule,
    NzFormModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule
  ]
})
export class UserModule {
}
