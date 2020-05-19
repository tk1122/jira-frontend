import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {userToken} from "../../app/module/auth/auth.selectors";
import {filter} from "rxjs/operators";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authToken: string = '';

  constructor(private readonly store: Store) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.store.pipe(select(userToken), filter((token): token is string => token !== undefined))
      .subscribe(token => this.authToken = token);

    return next.handle(req.clone({setHeaders: {Authorization: this.authToken}}));
  }
}
