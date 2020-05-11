import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {Store} from "@ngrx/store";
import {AuthService} from "./auth.service";
import {AuthActions} from "./auth.actions";
import {catchError, exhaustMap, map, tap} from "rxjs/operators";
import {of} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../../../shared/model/user";


@Injectable()
export class AuthEffects implements OnInitEffects {


  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(action =>
        this.authService.login(action.username, action.password).pipe(
          map(user => AuthActions.loginSuccess({user})),
          catchError(error => of(AuthActions.loginFailure({message: {code: "234", message: "334"}})))
        )
      )
    )
  });

  loginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap((action => {
        localStorage.setItem('user', JSON.stringify(action.user));
        this.router.navigateByUrl('/issues').then()
      }))
    )
  }, {dispatch: false})

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        localStorage.removeItem('user');
        this.router.navigateByUrl('/login').then();
      })
    )
  }, {dispatch: false})

  constructor(private actions$: Actions,
              private readonly store: Store,
              private readonly authService: AuthService,
              private readonly router: Router
  ) {
  }

  ngrxOnInitEffects() {
    const user = localStorage.getItem('user');
    if (!user) {
      return AuthActions.logout();
    }

    const parsedUser = JSON.parse(user) as User;
    return AuthActions.loginSuccess({user: parsedUser});
  }
}
