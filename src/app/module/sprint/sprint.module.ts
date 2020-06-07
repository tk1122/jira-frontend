import {reducer, sprintFeatureKey} from "./sprint.reducer";
import {projectIssueReducer, projectIssueFeatureKey} from "../issue/issue.reducer";
import {EffectsModule} from "@ngrx/effects";
import {CommonModule} from "@angular/common";
import {StoreModule} from "@ngrx/store";
import {NgModule} from "@angular/core";
import {SprintRoutingModule} from "./sprint-routing.module";
import {SprintEffects} from "./sprint.effect";
import { SprintComponent } from './component/sprint/sprint.component';
import {NzCollapseModule, NzLayoutModule, NzListModule, NzTreeModule} from "ng-zorro-antd";
import {EpicModule} from "../epic/epic.module";
import { SprintListComponent } from './component/sprint-list/sprint-list.component';
import {IssueEffects} from "../issue/issue.effects";
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [SprintComponent, SprintListComponent],
  imports: [
    CommonModule,
    SprintRoutingModule,
    StoreModule.forFeature(sprintFeatureKey, reducer),
    StoreModule.forFeature(projectIssueFeatureKey, projectIssueReducer),
    EffectsModule.forFeature([SprintEffects, IssueEffects]),
    NzLayoutModule,
    EpicModule,
    NzCollapseModule,
    NzListModule,
    NzTreeModule,
    DragDropModule
  ]
})
export class SprintModule {
}
