import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Store} from "@ngrx/store";
import {AuthService} from "./auth.service";
import {login, loginFailure, loginSuccess, logout, signup, signUpSuccess, unauthorizedAccess} from "./auth.actions";
import {catchError, exhaustMap, map, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {AuthInfo} from "../../../shared/model/auth-info";
import {ErrorMessage} from "../../../shared/model/error-message";
import {of} from "rxjs";
import {Location} from "@angular/common";


@Injectable()
export class AuthEffects implements OnInitEffects {

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      exhaustMap(action =>
        this.authService.login(action.username, action.password).pipe(
          map(user => loginSuccess({user})),
          catchError((err: ErrorMessage) => {
            return of(loginFailure({message: err}))
          })
        )
      )
    )
  });

  loginFailure$ = createEffect(() => this.actions$.pipe(
    ofType(loginFailure),
    tap((action) => {
      this.notification.error(action.message.message, '')
    })
  ), {dispatch: false})

  loginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginSuccess),
      tap((action => {
        localStorage.setItem('user', JSON.stringify(action.user));
        localStorage.setItem('accessToken', JSON.stringify(action.user.accessToken));
        console.log('user ', action.user);
        console.log('path ', action.path);
        if (action.user.isAdmin) {
          if (action.path) {
            return this.router.navigateByUrl(action.path).then()
          }

          return this.router.navigateByUrl('/users').then()
        }

        if (action.path) {
          return this.router.navigateByUrl(action.path).then()
        }
        console.log('navaigate to /issues')
        return this.router.navigateByUrl('/issues').then()
      }))
    )
  }, {dispatch: false})

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signup),
      exhaustMap(action =>
        this.authService.signup(action.user).pipe(
          map((user) => signUpSuccess({message: {code: "200", message: `Signup  ${user} success!`}})),
        )
      )
    )
  });

  signupSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signUpSuccess),
      tap((action => {
        console.log(action.message);
        this.router.navigateByUrl('/login').then()
      }))
    )
  }, {dispatch: false})

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logout),
      tap(() => {
        localStorage.removeItem('user');
        this.router.navigateByUrl('/login').then();
      })
    )
  }, {dispatch: false})

  unauthorizedAccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(unauthorizedAccess),
      tap(() => {
        this.router.navigateByUrl('/unauthorized-access').then();
      })
    )
  }, {dispatch: false})


  constructor(private actions$: Actions,
              private readonly store: Store,
              private readonly authService: AuthService,
              private readonly router: Router,
              private readonly notification: NzNotificationService,
              private readonly location: Location
  ) {
  }

  ngrxOnInitEffects() {
    const user = localStorage.getItem('user');
    if (!user) {
      return logout();
    }


    const parsedUser = JSON.parse(user) as AuthInfo;
    return loginSuccess({user: parsedUser, path: this.location.path()});
  }
}
