import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./module/shared-component/component/page-not-found/page-not-found.component";
import {UnauthorizedAccessComponent} from "./module/shared-component/component/unauthorized-access/unauthorized-access.component";
import {IssueModuleGaurd} from "./module/auth/auth.gaurd";


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/login'},
  {
    path: 'projects/:id',
    loadChildren: () => import('./module/epic/epic.module').then(m => m.EpicModule)
  },
  {path: 'projects', loadChildren: () => import('./module/project/project.module').then(m => m.ProjectModule)},
  {
    path: 'issues',
    loadChildren: () => import('./module/issue/issue.module').then(m => m.IssueModule),
    canLoad: [IssueModuleGaurd]
  },
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
