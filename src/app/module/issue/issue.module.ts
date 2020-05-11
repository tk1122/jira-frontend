import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IssueRoutingModule} from './issue-routing.module';
import {IssueComponent} from './component/issue.component';
import {NzButtonModule} from "ng-zorro-antd";


@NgModule({
  declarations: [IssueComponent],
  imports: [
    CommonModule,
    IssueRoutingModule,
    NzButtonModule
  ]
})
export class IssueModule {
}
