import {Provider} from "@angular/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./auth-interceptor";
import {LogInterceptor} from "./log-interceptor";

export const httpInterceptorProviders: Provider[] = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: LogInterceptor, multi: true}
]
