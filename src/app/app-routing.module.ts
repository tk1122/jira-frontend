import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./module/shared-component/component/page-not-found/page-not-found.component";
import {UnauthorizedAccessComponent} from "./module/shared-component/component/unauthorized-access/unauthorized-access.component";
import {UserContentModulesGaurd} from "./module/auth/auth.gaurd";


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/login'},
  {
    path: 'projects',
    loadChildren: () => import('./module/project/project.module').then(m => m.ProjectModule),
    canLoad: [UserContentModulesGaurd]
  },
  {
    path: 'issues',
    loadChildren: () => import('./module/issue/issue.module').then(m => m.IssueModule),
    canLoad: [UserContentModulesGaurd]
  },
  // {
  //   path: 'sprints',
  //   loadChildren: () => import('./module/sprint/sprint.module').then(m => m.SprintModule),
  //   canLoad: [UserContentModulesGaurd]
  // },
  {path: 'unauthorized-access', component: UnauthorizedAccessComponent},
  {path: 'users', loadChildren: () => import('./module/user/user.module').then(m => m.UserModule)},
  {
    path: '**',
    component: PageNotFoundComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
