import {Injectable} from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from "@angular/router";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {isAdmin, isLoggedIn} from "./auth.selectors";
import {map, withLatestFrom} from "rxjs/operators";
import {unauthorizedAccess} from "./auth.actions";
import {AuthModule} from "./auth.module";

@Injectable({
  providedIn: AuthModule
})
export class IssueModuleGaurd implements CanLoad {
  constructor(private readonly store: Store) {
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
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
