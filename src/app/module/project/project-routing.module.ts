import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProjectComponent} from './component/project/project.component';
import {ProjectListComponent} from "./component/project-list/project-list.component";
import {UserContentModulesGaurd} from "../auth/auth.gaurd";

const routes: Routes = [{
  path: '', component: ProjectComponent, children: [
    {
      path: '',
      component: ProjectListComponent
    },
    {
      path: ':id/epics',
      loadChildren: () => import('../../module/epic/epic.module').then(m => m.EpicModule),
      canLoad: [UserContentModulesGaurd]
    },
    {
      path: ':id/sprints',
      loadChildren: () => import('../../module/sprint/sprint.module').then(m => m.SprintModule),
      canLoad: [UserContentModulesGaurd]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {
}
