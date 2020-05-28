import { Pipe, PipeTransform } from '@angular/core';
import {IssueStatus} from "../../../../shared/model/issue";

@Pipe({name: 'issueStatus'})
export class IssueStatusPipe implements PipeTransform {
  transform(status: IssueStatus): string {
    switch (status) {
      case IssueStatus.Todo:
        return 'Todo'
      case IssueStatus.Doing:
        return 'Doing'
      case IssueStatus.Done:
        return 'Done'
      case IssueStatus.Testing:
        return 'Finished'
      default:
        return 'Undefined'
    }
  }
}
