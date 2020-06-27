import {createAction, props} from '@ngrx/store';
import {ErrorMessage} from "../../../shared/model/error-message";
import {Notification} from "../../../shared/model/notification";
import {Update} from "@ngrx/entity";

export const loadNotification = createAction(
  '[Notification Page] Load all notification',
  props<{notifications: Notification[]}>()
);

export const markAsReceived = createAction(
  '[Notification Page] Mark as received'
)

export const markAsReceivedSuccess = createAction(
  '[Notification Page] Mark as received success'
)

export const markAsReceivedFailed = createAction(
  '[Notification Page] Mark as received failed'
)

export const markAsRead = createAction(
  '[Notification Page] Mark as read notification',
  props<{id?: string}>()
)

export const markAsReadSuccess = createAction(
  '[Notification Page] Mark as read notification success'
)

export const markAsReadFailed = createAction(
  '[Notification Page] Mark as read notification failed'
)

export const deleteNotification = createAction(
  '[Notification Page] Deleted notification',
  props<{id: string}>()
)

export const deleteNotificationSuccess = createAction(
  '[Notification Page] Deleted notification success'
)

export const deleteNotificationFailed= createAction(
  '[Notification Page] Deleted notification failed'
)


