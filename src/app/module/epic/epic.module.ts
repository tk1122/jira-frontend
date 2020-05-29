import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpicComponent } from './component/epic/epic.component';
import { EpicListComponent } from './component/epic-list/epic-list.component';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import * as fromEpic from './epic.reducer';
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
import { EpicSidebarComponent } from './component/epic-sidebar/epic-sidebar.component';
import {IssueEffects} from "../issue/issue.effects";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [EpicComponent, EpicListComponent, EpicSidebarComponent],
  imports: [
    CommonModule,
    EpicRoutingModule,
    StoreModule.forFeature(fromEpic.epicFeatureKey, fromEpic.reducer),
    EffectsModule.forFeature([EpicEffects]),
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
