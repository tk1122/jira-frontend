import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {loadUsers, loadUsersSuccess} from "./user.actions";
import {map, switchMap} from "rxjs/operators";
import {UserService} from "./user.service";


@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(action => this.userService.loadUsers().pipe(
        map(users => loadUsersSuccess({users}))
      ))
    )
  )

  constructor(private actions$: Actions, private readonly userService: UserService) {
  }

}
