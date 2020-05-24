import {Pipe, PipeTransform} from '@angular/core';
import {UserStatus} from "../../../../shared/model/user";

@Pipe({name: 'userStatus'})
export class UserStatusPipe implements PipeTransform {
  transform(status: UserStatus): string {
    switch (status) {
      case UserStatus.Activated:
        return 'Active'
      case UserStatus.Blocked:
        return 'Blocked'
      case UserStatus.Unactivated:
        return 'Unactivated'
      default:
        return 'Undefined'
    }
  }
}
