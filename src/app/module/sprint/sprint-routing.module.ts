import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SprintComponent} from "./component/sprint/sprint.component";
import {SprintListComponent} from "./component/sprint-list/sprint-list.component";
import {UserContentModulesGaurd} from "../auth/auth.gaurd";

const routes: Routes = [{
  path: '', component: SprintComponent, children: [{
    path: '', component: SprintListComponent,
    loadChildren: () => import('../../module/issue/issue.module').then(m => m.IssueModule),
    canLoad: [UserContentModulesGaurd]
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SprintRoutingModule { }
