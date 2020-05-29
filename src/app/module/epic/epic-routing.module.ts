import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EpicComponent} from './component/epic/epic.component';
import {EpicListComponent} from "./component/epic-list/epic-list.component";
import {UserContentModulesGaurd} from "../auth/auth.gaurd";

const routes: Routes = [{
  path: '', component: EpicComponent, children: [
    {
      path: '',
      component: EpicListComponent,
      loadChildren: () => import('../../module/issue/issue.module').then(m => m.IssueModule),
      canLoad: [UserContentModulesGaurd]
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EpicRoutingModule {
}
