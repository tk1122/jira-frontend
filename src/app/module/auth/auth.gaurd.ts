import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {isAdmin, isLoggedIn} from "./auth.selectors";
import {map, withLatestFrom} from "rxjs/operators";
import {unauthorizedAccess} from "./auth.actions";
import {AuthModule} from "./auth.module";

@Injectable({
  providedIn: AuthModule
})
export class IssueModuleGaurd implements CanActivate {
  constructor(private readonly store: Store) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(
      select(isLoggedIn),
      withLatestFrom(this.store.select(isAdmin)),
      map(([isLoggedIn, isAdmin]) => {
      if (!isLoggedIn) {
        this.store.dispatch(unauthorizedAccess());
        return false
      }

      if (isAdmin !== undefined && isAdmin) {
        this.store.dispatch(unauthorizedAccess());
        return false;
      }

      return true;
    }));
  }
}
