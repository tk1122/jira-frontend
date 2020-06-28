import {reducer, sprintFeatureKey} from "./sprint.reducer";
import {projectIssueReducer, projectIssueFeatureKey} from "../issue/issue.reducer";
import {EffectsModule} from "@ngrx/effects";
import {CommonModule} from "@angular/common";
import {StoreModule} from "@ngrx/store";
import {NgModule} from "@angular/core";
import {SprintRoutingModule} from "./sprint-routing.module";
import {SprintEffects} from "./sprint.effect";
import { SprintComponent } from './component/sprint/sprint.component';
import {NzCollapseModule, NzIconModule, NzLayoutModule, NzListModule, NzTreeModule} from "ng-zorro-antd";
import {EpicModule} from "../epic/epic.module";
import { SprintListComponent } from './component/sprint-list/sprint-list.component';
import {IssueEffects} from "../issue/issue.effects";
import {DragDropModule} from '@angular/cdk/drag-drop';
import { SprintBoardComponent } from './component/sprint-board/sprint-board.component';

@NgModule({
  declarations: [SprintComponent, SprintListComponent, SprintBoardComponent],
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
        DragDropModule,
        NzIconModule
    ]
})
export class SprintModule {
}
