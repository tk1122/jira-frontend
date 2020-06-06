import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpicComponent } from './component/epic/epic.component';
import { EpicListComponent } from './component/epic-list/epic-list.component';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import * as fromEpic from './epic.reducer';
import * as fromRoles from '../user/user.reducer';
import {EpicRoutingModule} from "./epic-routing.module";
import {EpicEffects} from "./epic.effects";
import {
  NzButtonModule, NzDatePickerModule, NzFormModule, NzGridModule,
  NzIconModule, NzInputModule,
  NzLayoutModule,
  NzMenuModule,
  NzModalModule,
  NzProgressModule,
  NzTableModule
} from "ng-zorro-antd";
import {SharedComponentModule} from "../shared-component/shared-component.module";
import { SidebarComponent } from '../shared-component/component/sidebar/sidebar.component';
import {IssueEffects} from "../issue/issue.effects";
import {ReactiveFormsModule} from "@angular/forms";
import {RoleEffects} from "../user/user.effects";



@NgModule({
  declarations: [EpicComponent, EpicListComponent, SidebarComponent],
  exports: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    EpicRoutingModule,
    StoreModule.forFeature(fromEpic.epicFeatureKey, fromEpic.reducer),
    StoreModule.forFeature(fromRoles.roleFeatureKey, fromRoles.roleReducer),
    EffectsModule.forFeature([EpicEffects, RoleEffects]),
    NzTableModule,
    NzIconModule,
    SharedComponentModule,
    NzLayoutModule,
    NzMenuModule,
    NzProgressModule,
    NzModalModule,
    NzButtonModule,
    NzGridModule,
    NzInputModule,
    NzFormModule,
    ReactiveFormsModule,
    NzDatePickerModule,
  ]
})
export class EpicModule { }
