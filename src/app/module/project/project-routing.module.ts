import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProjectComponent} from './component/project/project.component';
import {ProjectListComponent} from "./component/project-list/project-list.component";

const routes: Routes = [{
  path: '', component: ProjectComponent, children: [
    {
      path: '',
      component: ProjectListComponent
    },
    {
      path: ':id',
      loadChildren: () => import('../../module/epic/epic.module').then(m => m.EpicModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {
}
