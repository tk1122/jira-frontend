import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {
  loadRoles,
  loadRolesFailure,
  loadRolesSuccess,
  loadUserFailure,
  loadUsers,
  loadUsersSuccess,
  updateUser,
  updateUserFailure,
  updateUserSuccess
} from "./user.actions";
import {catchError, filter, map, switchMap, tap, withLatestFrom} from "rxjs/operators";
import {UserService} from "./user.service";
import {of} from "rxjs";
import {ErrorMessage} from "../../../shared/model/error-message";
import {Action, select, Store} from "@ngrx/store";
import {isRolesLoaded, isUsersLoaded} from "./user.selectors";
import {NzNotificationService} from "ng-zorro-antd";


@Injectable()
export class UserEffects implements OnInitEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      withLatestFrom(this.store.pipe(select(isUsersLoaded))),
      filter(([_, isLoaded]) => !isLoaded),
      switchMap(([action, _]) => this.userService.loadUsers().pipe(
        map(users => loadUsersSuccess({users})),
        catchError((err: ErrorMessage) => of(loadUserFailure({error: err})))
      ))
    )
  )

  loadUsersFailure$ = createEffect(() => this.actions$.pipe(
    ofType(loadUserFailure),
  ), {dispatch: false})

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      switchMap(({user: {id, changes: {status, skill, level, roleIds}}}) =>
        this.userService.updateUser(id, roleIds, status, skill, level).pipe(
          map(user => updateUserSuccess({})),
          catchError((err: ErrorMessage) => {
            return of(updateUserFailure({error: err}))
          })
        )
      )
    )
  )

  updateUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserSuccess),
      tap(() => this.notification.success('Update user success', ''))
    ), {dispatch: false}
  )

  updateUserFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserFailure),
      tap(({error: {error}}) => {
        this.notification.error(error, '')
      })
    ), {dispatch: false}
  )

  constructor(private actions$: Actions, private readonly userService: UserService, private readonly store: Store, private readonly notification: NzNotificationService) {
  }

  ngrxOnInitEffects(): Action {
    return loadUsers({});
  }
}

@Injectable()
export class RoleEffects implements OnInitEffects {

  loadRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRoles),
      withLatestFrom(this.store.pipe(select(isRolesLoaded))),
      filter(([_, isLoaded]) => !isLoaded),
      switchMap(([action, _]) => this.userService.loadRoles().pipe(
        map(roles => loadRolesSuccess({roles})),
        catchError((err: ErrorMessage) => of(loadRolesFailure({error: err})))
      ))
    )
  )

  loadRolesFailure$ = createEffect(() => this.actions$.pipe(
    ofType(loadRolesFailure),
  ), {dispatch: false})


  constructor(private actions$: Actions, private readonly userService: UserService, private readonly store: Store) {
  }

  ngrxOnInitEffects(): Action {
    return loadRoles({});
  }
}
