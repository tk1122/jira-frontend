import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IssueRoutingModule} from './issue-routing.module';
import {IssueComponent} from './component/issue/issue.component';
import {NzButtonModule} from "ng-zorro-antd";
import {StoreModule} from '@ngrx/store';
import * as fromIssue from './issue.reducer';
import {SharedComponentModule} from "../shared-component/shared-component.module";
import { EffectsModule } from '@ngrx/effects';
import { IssueEffects } from './issue.effects';


@NgModule({
  declarations: [IssueComponent],
  imports: [
    CommonModule,
    IssueRoutingModule,
    NzButtonModule,
    StoreModule.forFeature(fromIssue.issueFeatureKey, fromIssue.reducer),
    SharedComponentModule,
    EffectsModule.forFeature([IssueEffects])
  ]
})
export class IssueModule {
}
