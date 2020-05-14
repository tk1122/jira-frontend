import {Injectable} from "@angular/core";
import {IssueModule} from "./issue.module";
import {HttpClient} from "@angular/common/http";
import {Issue, IssuePriority, IssueStatus, IssueType} from "../../../shared/model/issue";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private readonly mockIssues: Issue[] = [
    {
      name: 'issue 1 name',
      desciption: 'issue 1 description',
      status: IssueStatus.Todo,
      type: IssueType.Task,
      assigneeId: 1,
      entityType: 3,
      id: 1,
      priority: IssuePriority.Medium,
      reporterId: 2,
      sprintId: 3,
      storyPoint: 2
    },
    {
      name: 'issue 2 name',
      desciption: 'issue 2 description',
      status: IssueStatus.Done,
      type: IssueType.Task,
      assigneeId: 1,
      entityType: 3,
      id: 2,
      priority: IssuePriority.Medium,
      reporterId: 3,
      sprintId: 3,
      storyPoint: 3
    },

  ]

  constructor(private readonly httpClient: HttpClient) {
  }

  getIssuesByAssigneeId(assigneeId: number) {
    return of(this.mockIssues);
  }
}
