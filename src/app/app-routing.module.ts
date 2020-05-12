import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./component/page-not-found/page-not-found.component";
import {UnauthorizedAccessComponent} from "./component/unauthorized-access/unauthorized-access.component";
import {AuthGaurd} from "./module/auth/auth.gaurd";


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/issues'},
  {
    path: 'issues',
    loadChildren: () => import('./module/issue/issue.module').then(m => m.IssueModule),
    canActivate: [AuthGaurd]
  },
  {path: 'unauthorized-access', component: UnauthorizedAccessComponent},
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
