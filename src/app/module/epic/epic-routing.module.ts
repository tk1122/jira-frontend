import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EpicComponent } from './component/epic/epic.component';

const routes: Routes = [{ path: '', component: EpicComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EpicRoutingModule { }
