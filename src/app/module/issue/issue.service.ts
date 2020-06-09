import {Injectable} from "@angular/core";
import {of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Issue, IssueStatus} from "../../../shared/model/issue";

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  constructor(private readonly httpClient: HttpClient) {
  }


  getIssuesByAssigneeId() {
    return this.httpClient.get<Issue[]>(`${environment.url}/issues`)
  }

  getIssuesByProjectId(projectId: string) {
    console.log(projectId)
    return this.httpClient.get<Issue[]>(`${environment.url}/issues?projectId=${projectId}`)
  }

  updateIssue(issueId: string | number, sprintId?: number | null) {
    console.log(issueId)
    console.log(sprintId)
    return this.httpClient.put<Issue>(`${environment.url}/issues/${Number(issueId)}`, {sprintId})
  }

  updateIssueStatus(issueId: string | number, status?: IssueStatus | undefined | null) {
    console.log(issueId)
    console.log(status)
    return this.httpClient.put<Issue>(`${environment.url}/issues/${Number(issueId)}/status`, {status})
  }

}
