import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry, tap} from 'rxjs/operators';
import {ErrorMessage} from "../model/error-message";

export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(3),
        tap((res) => {
          console.log(res)
        }),
        catchError((res: HttpErrorResponse) => {
          const errorMessage: ErrorMessage = {
            message: res.error.message,
            statusCode: res.error.statusCode,
            error: res.error.error || 'Network Error',
          }

          return throwError(errorMessage);
        })
      )
  }
}
