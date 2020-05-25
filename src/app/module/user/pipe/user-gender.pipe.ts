import {Pipe, PipeTransform} from '@angular/core';
import {UserGender, UserStatus} from "../../../../shared/model/user";

@Pipe({name: 'userGender'})
export class UserGenderPipe implements PipeTransform {
  transform(gender: UserGender): string {
    switch (gender) {
      case UserGender.Male:
        return 'Male'
      case UserGender.Female:
        return 'Female'
      case UserGender.Others:
        return 'Other'
    }
  }
}
