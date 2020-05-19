import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {AuthInfo} from "../../../shared/model/auth-info";
import {User, UserRoles, UserStatus} from "../../../shared/model/user";
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private readonly mockLoginSuccessResponse: AuthInfo = {
  //   username: 'sinhngo', userId: 1, role: [UserRoles.Admin], status: UserStatus.Active, accessToken: '123'
  // }

  private readonly mockSignUpSuccessResponse = {
    username: 'sinhngo'
  }

  constructor(private readonly httpClient: HttpClient) {
  }

  login(username: string, password: string) {
    return this.httpClient.post<AuthInfo>(`${environment.url}/auth/login`, {username, password})
    // return of(this.mockLoginSuccessResponse)
  }

  signup(user: Partial<User> ) {
    return of(user)
  }
}
