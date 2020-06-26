import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationListComponent } from './component/notification-list/notification-list.component';
import {
  NzAvatarModule, NzBadgeModule, NzCheckboxModule,
  NzDropDownModule,
  NzGridModule,
  NzIconModule,
  NzListModule,
  NzSkeletonModule
} from "ng-zorro-antd";
import {StoreModule} from "@ngrx/store";
import * as fromNotification from "./notification.reducer";
import {FormsModule} from "@angular/forms";
import {EffectsModule} from "@ngrx/effects";
import {NotificationEffect} from "./notification.effect";
import {ScrollingModule} from "@angular/cdk/scrolling";



@NgModule({
  declarations: [NotificationListComponent],
  exports: [
    NotificationListComponent
  ],
  imports: [
    CommonModule,
    NzDropDownModule,
    StoreModule.forFeature(fromNotification.notificationFeatureKey, fromNotification.reducer),
    EffectsModule.forFeature([NotificationEffect]),
    NzIconModule,
    NzGridModule,
    NzAvatarModule,
    NzListModule,
    NzSkeletonModule,
    FormsModule,
    NzCheckboxModule,
    NzBadgeModule,
    ScrollingModule
  ]
})
export class NotificationModule { }
