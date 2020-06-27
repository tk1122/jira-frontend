import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {IssueComponent} from './component/issue/issue.component';
import {IssueListComponent} from "./component/issue-list/issue-list.component";
import {IssueDetailComponent} from "./component/issue-detail/issue-detail.component";

const routes: Routes = [{
  path: '', component: IssueComponent, children: [
    {
      path: '',
      component: IssueListComponent,
    },
  ],
},
  {
    path: ':id',
    component: IssueDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssueRoutingModule {
}
