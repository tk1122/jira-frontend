import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
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
import {select, Store} from "@ngrx/store";
import {isRolesLoaded, isUsersLoaded} from "./user.selectors";


@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      withLatestFrom(this.store.pipe(select(isUsersLoaded))),
      filter(([_, isLoaded]) => !isLoaded),
      switchMap(([action, _]) => this.userService.loadUsers().pipe(
        map(users => loadUsersSuccess({users})),
        tap(user => console.log(user)),
        catchError((err: ErrorMessage) => of(loadUserFailure({error: err})))
      ))
    )
  )

  loadUsersFailure$ = createEffect(() => this.actions$.pipe(
    ofType(loadUserFailure),
  ), {dispatch: false})

  // updateUser$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(updateUser),
  //     switchMap(({user: {id, changes: {status, skill, level}}}) =>
  //       this.userService.updateUser(id, status, skill, level).pipe(
  //         map(user => updateUserSuccess({}),
  //           catchError((err: ErrorMessage) => of(updateUserFailure({error: err})))
  //         )
  //       )
  //     )
  //   )
  // )

  constructor(private actions$: Actions, private readonly userService: UserService, private readonly store: Store) {
  }
}

@Injectable()
export class RoleEffects {

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
}
