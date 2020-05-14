import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {AuthInfo, UserRoles, UserStatus} from "../../../shared/model/auth-info";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly mockLoginSuccessResponse: AuthInfo = {
    username: 'sinhngo', id: 1, role: UserRoles.Admin, status: UserStatus.Active, token: '123'
  }

  private readonly mockSignUpSuccessResponse = {
    username: 'sinhngo'
  }

  constructor(private readonly httpClient: HttpClient) {
  }

  login(username: string, password: string) {
    return of(this.mockLoginSuccessResponse)
  }

  signup(username: string, password: string, passwordCheck: string) {
    return of(this.mockSignUpSuccessResponse)
  }
}
