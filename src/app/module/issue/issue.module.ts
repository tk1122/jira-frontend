import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IssueRoutingModule} from './issue-routing.module';
import {IssueComponent} from './component/issue/issue.component';
import {NzButtonModule, NzGridModule, NzIconModule, NzTableModule, NzTabsModule} from "ng-zorro-antd";
import {StoreModule} from '@ngrx/store';
import * as fromIssue from './issue.reducer';
import {SharedComponentModule} from "../shared-component/shared-component.module";
import { EffectsModule } from '@ngrx/effects';
import { IssueEffects } from './issue.effects';
import { IssueListComponent } from './component/issue-list/issue-list.component';
import { IssueStatusPipe } from "./pipe/issue-status.pipe";


@NgModule({
  declarations: [IssueComponent, IssueListComponent, IssueStatusPipe],
    imports: [
        CommonModule,
        IssueRoutingModule,
        NzButtonModule,
        StoreModule.forFeature(fromIssue.issueFeatureKey, fromIssue.issueReducer),
        StoreModule.forFeature(fromIssue.projectIssueFeatureKey, fromIssue.projectIssueReducer),
        SharedComponentModule,
        EffectsModule.forFeature([IssueEffects]),
        NzGridModule,
        NzTabsModule,
        NzTableModule,
        NzIconModule
    ]
})
export class IssueModule {
}
