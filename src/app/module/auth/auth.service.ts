import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {User, UserRoles, UserStatus} from "../../../shared/model/user";
import {ErrorMessage} from "../../../shared/model/error-message";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly mockLoginSuccessResponse: User = {
    username: 'sinhngo', id: 1, role: UserRoles.Admin, status: UserStatus.Active, token: '123'
  }

  constructor(private readonly httpClient: HttpClient) {
  }

  login(username: string, password: string) {
    // if (Math.random() > 0.5) {
      return of(this.mockLoginSuccessResponse)
    // }
    //
    // return of(this.mockLoginFailureResponse)
  }
}
