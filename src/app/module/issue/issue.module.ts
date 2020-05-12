import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IssueRoutingModule} from './issue-routing.module';
import {IssueComponent} from './component/issue/issue.component';
import {NzButtonModule, NzGridModule, NzTableModule, NzTabsModule} from "ng-zorro-antd";
import {StoreModule} from '@ngrx/store';
import * as fromIssue from './issue.reducer';
import {SharedComponentModule} from "../shared-component/shared-component.module";
import { IssueListComponent } from './component/issue-list/issue-list.component';


@NgModule({
  declarations: [IssueComponent, IssueListComponent],
  imports: [
    CommonModule,
    IssueRoutingModule,
    NzButtonModule,
    StoreModule.forFeature(fromIssue.issueFeatureKey, fromIssue.reducer),
    SharedComponentModule,
    NzGridModule,
    NzTabsModule,
    NzTableModule
  ]
})
export class IssueModule {
}
