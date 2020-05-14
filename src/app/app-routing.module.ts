import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./component/page-not-found/page-not-found.component";


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/issues'},
  {path: 'issues', loadChildren: () => import('./module/issue/issue.module').then(m => m.IssueModule)},
  { path: 'projects', loadChildren: () => import('./module/project/project.module').then(m => m.ProjectModule) }, {
    path: '**',
    component: PageNotFoundComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
