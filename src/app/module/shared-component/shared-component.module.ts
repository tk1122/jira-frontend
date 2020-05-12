import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageNotFoundComponent} from "./component/page-not-found/page-not-found.component";
import {UnauthorizedAccessComponent} from "./component/unauthorized-access/unauthorized-access.component";
import {NzButtonModule, NzResultModule} from "ng-zorro-antd";


@NgModule({
  declarations: [PageNotFoundComponent, UnauthorizedAccessComponent],
  imports: [
    CommonModule,
    NzButtonModule,
    NzResultModule,
  ],
  exports: [PageNotFoundComponent, UnauthorizedAccessComponent]
})
export class SharedComponentModule {
}
