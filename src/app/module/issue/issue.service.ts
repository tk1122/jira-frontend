import {Injectable} from "@angular/core";
import {of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Issue} from "../../../shared/model/issue";

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  constructor(private readonly httpClient: HttpClient) {
  }


  getIssuesByAssigneeId() {
    return this.httpClient.get<Issue[]>(`${environment.url}/issues`)
  }
}
