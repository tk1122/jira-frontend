import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Project, ProjectStatus} from "../../../shared/model/project";
import {UserService} from "../user/user.service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private readonly httpClient: HttpClient, private readonly userService: UserService) {
  }

  getProjectsByUserId(name?: string, status?: ProjectStatus) {
    const params = new HttpParams()
    if (name != undefined) {
      params.append('name', name);
    }
    if (status != undefined) {
      params.append('status', status.toString())
    }

    params.append('limit', '50')

    return this.httpClient.get<Project[]>(`${environment.url}/projects`, {params})
  }
}
