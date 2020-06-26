import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {loadProjectFailure, loadProjects, loadProjectsSuccess} from "../project/project.actions";
import {catchError, filter, map, switchMap, tap, withLatestFrom} from "rxjs/operators";
import {select, Store} from "@ngrx/store";
import {isProjectsLoaded} from "../project/project.selectors";
import {ErrorMessage} from "../../../shared/model/error-message";
import {of} from "rxjs";
import {ProjectService} from "../project/project.service";
import {UserService} from "../user/user.service";
import {NotificationService} from "./notification.service";
import {
  deleteNotification, deleteNotificationFailed, deleteNotificationSuccess,
  markAsRead, markAsReadFailed,
  markAsReadSuccess,
  markAsReceived,
  markAsReceivedFailed,
  markAsReceivedSuccess
} from "./notification.action";


@Injectable()
export class NotificationEffect {

  markAsReceived$ = createEffect(() =>
    this.actions$.pipe(
      ofType(markAsReceived),
      switchMap((action) =>
        this.notificationService.markAsReceived().pipe(
          map(() => {
            return markAsReceivedSuccess();
          }),
          catchError((err: ErrorMessage) => {
            return of(markAsReceivedFailed());
          })
        )
      )
    )
  )

  markAsRead$ = createEffect(() =>
    this.actions$.pipe(
      ofType(markAsRead),
      tap(x => console.log(x)),
      switchMap((action) =>
        this.notificationService.markAsRead(action.id).pipe(
          map(() => {
            return markAsReadSuccess();
          }),
          catchError((err: ErrorMessage) => {
            return of(markAsReadFailed());
          })
        )
      )
    )
  )

  deleteNotification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteNotification),
      tap(x => console.log(x)),
      switchMap((action) =>
        this.notificationService.deleteNotification(action.id).pipe(
          map(() => {
            return deleteNotificationSuccess();
          }),
          catchError((err: ErrorMessage) => {
            return of(deleteNotificationFailed());
          })
        )
      )
    )
  )

  constructor(private actions$: Actions, private readonly notificationService: NotificationService, private readonly store: Store) {
  }
}
