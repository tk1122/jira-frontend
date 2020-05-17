import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User, UserGender, UserRoles, UserStatus} from "../../../shared/model/user";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly mockUsers: User[] = [{
    id: 1,
    status: UserStatus.Active,
    role: UserRoles.PM,
    username: 'sinh1',
    age: 22,
    email: 'kaka.ngo@gmail.com',
    gender: UserGender.Male,
    level: '1',
    skill: 'Nodejs'
  },
    {
      id: 2,
      status: UserStatus.Active,
      role: UserRoles.Leader,
      username: 'sinh2',
      age: 22,
      email: 'kaka.ngo@gmail.com',
      gender: UserGender.Male,
      level: '1',
      skill: 'Nodejs'
    },
    {
      id: 3,
      status: UserStatus.Active,
      role: UserRoles.Dev,
      username: 'sinh3',
      age: 22,
      email: 'kaka.ngo@gmail.com',
      gender: UserGender.Male,
      level: '1',
      skill: 'Nodejs'
    },
    {
      id: 4,
      status: UserStatus.Active,
      role: UserRoles.Dev,
      username: 'sinh4',
      age: 22,
      email: 'kaka.ngo@gmail.com',
      gender: UserGender.Male,
      level: '1',
      skill: 'Nodejs'
    },
    {
      id: 5,
      status: UserStatus.Active,
      role: UserRoles.Dev,
      username: 'sinh5',
      age: 22,
      email: 'kaka.ngo@gmail.com',
      gender: UserGender.Male,
      level: '1',
      skill: 'Nodejs'
    }
  ]

  constructor(private readonly httpClient: HttpClient) {
  }

  loadUsers() {
    return of(this.mockUsers)
  }

  getUsersByProjectId(projectId: number) {
    return of(this.mockUsers)
  }
}
