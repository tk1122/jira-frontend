import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Epic} from "../../../shared/model/epic";

@Injectable({
  providedIn: 'root'
})
export class EpicService {
  constructor(private readonly httpClient: HttpClient) {
  }

  getEpicByProjectId(projectId?: string) {
    const params = new HttpParams()
    if (projectId != undefined) {
      params.append('projectId', projectId);
    }

    return this.httpClient.get<Epic[]>(`${environment.url}/epics?projectId=${projectId}`)
  }

  createEpic(epic: Epic) {
    console.log(epic)
    const { name, description, startDate, endDate, projectId} = epic
    return this.httpClient.post<Epic>(`${environment.url}/epics`, {
      name,
      description,
      startDate,
      endDate,
      projectId
    })
  }
}
