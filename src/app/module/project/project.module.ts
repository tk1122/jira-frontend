import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProjectRoutingModule} from './project-routing.module';
import {ProjectComponent} from './component/project/project.component';
import {ProjectListComponent} from './component/project-list/project-list.component';
import {StoreModule} from '@ngrx/store';
import * as fromProject from './project.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProjectEffects } from './project.effects';
import {SharedComponentModule} from "../shared-component/shared-component.module";
import {
  NzButtonModule, NzFormModule,
  NzGridModule,
  NzIconModule,
  NzInputModule,
  NzModalModule, NzSelectModule,
  NzTableModule,
  NzWaveModule
} from "ng-zorro-antd";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [ProjectComponent, ProjectListComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    StoreModule.forFeature(fromProject.projectFeatureKey, fromProject.reducer),
    EffectsModule.forFeature([ProjectEffects]),
    SharedComponentModule,
    NzGridModule,
    NzTableModule,
    NzInputModule,
    NzIconModule,
    NzWaveModule,
    NzButtonModule,
    NzModalModule,
    ReactiveFormsModule,
    NzFormModule,
    NzSelectModule
  ]
})
export class ProjectModule { }
