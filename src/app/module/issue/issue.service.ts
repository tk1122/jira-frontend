import {Injectable} from "@angular/core";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IssueService {


  getIssuesByAssigneeId(assigneeId: number) {
    return of([]);
  }
}
