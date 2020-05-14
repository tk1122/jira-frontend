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
      description: 'issue 1 description',
      status: IssueStatus.Checking,
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
      description: 'issue 2 description',
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
    {
      name: 'issue 3 name',
      description: 'issue 3 description',
      status: IssueStatus.Todo,
      type: IssueType.Task,
      assigneeId: 1,
      entityType: 3,
      id: 3,
      priority: IssuePriority.Medium,
      reporterId: 3,
      sprintId: 3,
      storyPoint: 3
    },
    {
      name: 'issue 4 name',
      description: 'issue 4 description',
      status: IssueStatus.Finished,
      type: IssueType.Task,
      assigneeId: 1,
      entityType: 3,
      id: 4,
      priority: IssuePriority.Medium,
      reporterId: 3,
      sprintId: 3,
      storyPoint: 3
    },{
      name: 'issue 5 name',
      description: 'issue 5 description',
      status: IssueStatus.InProgress,
      type: IssueType.Task,
      assigneeId: 1,
      entityType: 3,
      id: 5,
      priority: IssuePriority.Medium,
      reporterId: 3,
      sprintId: 3,
      storyPoint: 3
    },
    {
      name: 'issue 6 name',
      description: 'issue 6 description',
      status: IssueStatus.Reopened,
      type: IssueType.Task,
      assigneeId: 1,
      entityType: 3,
      id: 6,
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
