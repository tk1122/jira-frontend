import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {AuthSelectors} from "./auth.selectors";
import {map} from "rxjs/operators";
import {AuthActions} from "./auth.actions";
import {AuthModule} from "./auth.module";

@Injectable({
  providedIn: AuthModule
})
export class AuthGaurd implements CanActivate {
  constructor(private readonly store: Store) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(select(AuthSelectors.selectIsLoggedIn), map(isLoggedIn => {
      if (!isLoggedIn) {
        this.store.dispatch(AuthActions.unauthorizedAccess());
      }

      return isLoggedIn;
    }));
  }


}
