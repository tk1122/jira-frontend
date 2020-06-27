import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserComponent} from './component/user/user.component';
import {UserDetailComponent} from "./component/user-detail/user-detail.component";
import {UserListComponent} from "./component/user-list/user-list.component";

const routes: Routes = [{
  path: '', component: UserComponent, children: [
    {
      path: '',
      component: UserListComponent,
      children: [
        {
          path: ':id',
          component: UserDetailComponent
        },
      ]
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
