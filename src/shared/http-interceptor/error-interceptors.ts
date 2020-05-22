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
        catchError((error: HttpErrorResponse) => {
          const errorMessage: ErrorMessage = {
            message: error.error.message || 'Network Error',
            code: error.error.statusCode,
            type: error.error.error,
          }

          return throwError(errorMessage);
        })
      )
  }
}
