import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {finalize, tap} from "rxjs/operators";

@Injectable()
export class LogInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    let ok: string;

    return next.handle(req).pipe(
      tap(
        event => ok = event instanceof HttpResponse ? 'succeeded' : '',
        () => ok = 'failed'
      ),
      finalize(() => {
        const elapsed = Date.now() - started;

        const msg = `${req.method} "${req.urlWithParams}"
             ${ok} in ${elapsed} ms.`;

        console.log(msg);
      })
    )
  }

}
