import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageNotFoundComponent} from "./component/page-not-found/page-not-found.component";
import {UnauthorizedAccessComponent} from "./component/unauthorized-access/unauthorized-access.component";
import {NzButtonModule, NzGridModule, NzResultModule} from "ng-zorro-antd";
import {HeaderComponent} from "./component/header/header.component";


@NgModule({
  declarations: [PageNotFoundComponent, UnauthorizedAccessComponent, HeaderComponent],
  imports: [
    CommonModule,
    NzButtonModule,
    NzResultModule,
    NzGridModule
  ],
  exports: [PageNotFoundComponent, UnauthorizedAccessComponent, HeaderComponent]
})
export class SharedComponentModule {
}
