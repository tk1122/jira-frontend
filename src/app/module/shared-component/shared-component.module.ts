import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageNotFoundComponent} from "./component/page-not-found/page-not-found.component";
import {UnauthorizedAccessComponent} from "./component/unauthorized-access/unauthorized-access.component";
import {
    NzButtonModule,
    NzDropDownModule,
    NzGridModule,
    NzIconModule,
    NzMenuModule,
    NzResultModule
} from "ng-zorro-antd";
import {HeaderComponent} from "./component/header/header.component";
import {RouterModule} from "@angular/router";
import {NotificationModule} from "../notification/notification.module";


@NgModule({
  declarations: [PageNotFoundComponent, UnauthorizedAccessComponent, HeaderComponent],
    imports: [
        CommonModule,
        NzButtonModule,
        NzResultModule,
        NzGridModule,
        NzMenuModule,
        NzIconModule,
        NzDropDownModule,
        RouterModule,
        NotificationModule,
    ],
  exports: [PageNotFoundComponent, UnauthorizedAccessComponent, HeaderComponent]
})
export class SharedComponentModule {
}
