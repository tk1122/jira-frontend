import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IssueRoutingModule} from './issue-routing.module';
import {IssueComponent} from './component/issue/issue.component';
import {NzButtonModule} from "ng-zorro-antd";
import { StoreModule } from '@ngrx/store';
import * as fromIssue from './issue.reducer';
import {AppModule} from "../../app.module";


@NgModule({
  declarations: [IssueComponent],
  imports: [
    CommonModule,
    IssueRoutingModule,
    NzButtonModule,
    StoreModule.forFeature(fromIssue.issueFeatureKey, fromIssue.reducer),
    AppModule
  ]
})
export class IssueModule {
}
