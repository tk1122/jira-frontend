import {createFeatureSelector, createSelector} from "@ngrx/store";
import {notificationFeatureKey, notificationEntityAdapter, NotificationState} from "./notification.reducer";
import * as moment from 'moment';

const selectNotificationState = createFeatureSelector<NotificationState>(notificationFeatureKey);

export const notifications = createSelector(selectNotificationState, notificationEntityAdapter.getSelectors().selectAll)

export const notificationsLoaded = createSelector(notifications, (notifications => {
  let result = notifications.map(notification => {
    return {
      ...notification,
      // @ts-ignore
      timestamp: moment(notification.createdAt?.toDate()).fromNow()
    }
  })
  console.log(result)
  return result
}))


