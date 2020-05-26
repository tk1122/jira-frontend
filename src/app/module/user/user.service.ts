import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User, UserStatus} from "../../../shared/model/user";
import {Role} from "../../../shared/model/role";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private readonly httpClient: HttpClient) {
  }

  loadRoles() {
    return this.httpClient.get<Role[]>(`${environment.url}/users/roles`);
  }

  loadUsers(username?: string, page?: number, limit?: number) {
    const params = new HttpParams();
    if (username != undefined) {
      params.append('username', username)
    }
    params.append('limit', '50')

    return this.httpClient.get<User[]>(`${environment.url}/users`, {params})
  }

  updateUser(userId: number | string, roleIds?: number[], status?: UserStatus | null, skill?: string | null, level?: string | null) {
    return this.httpClient.put<User>(`${environment.url}/users/${userId}`, {
      roleIds,
      skill,
      status,
      level
    })
  }
}
