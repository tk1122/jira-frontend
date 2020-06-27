import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Epic} from "../../../shared/model/epic";
import {environment} from "../../../environments/environment";
import {Sprint} from "../../../shared/model/sprint";

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  constructor(private readonly httpClient: HttpClient) {
  }

  getSprintByProjectId(projectId?: string) {
    const params = new HttpParams()
    if (projectId != undefined) {
      params.append('projectId', projectId);
    }

    return this.httpClient.get<Sprint[]>(`${environment.url}/sprints?projectId=${projectId}`)
  }

}
