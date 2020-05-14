import { Pipe, PipeTransform } from '@angular/core';
import {IssueStatus} from "../../../../shared/model/issue";

@Pipe({name: 'issueStatus'})
export class IssueStatusPipe implements PipeTransform {
  transform(status: number): string {
    switch (status) {
      case IssueStatus.Todo:
        return 'Todo'
      case IssueStatus.Checking:
        return 'Checking'
      case IssueStatus.Done:
        return 'Done'
      case IssueStatus.Finished:
        return 'Finished'
      case IssueStatus.InProgress:
        return 'In Progress'
      case IssueStatus.Reopened:
        return 'Re Open'
      default:
        return 'Undefined'
    }
  }
}
