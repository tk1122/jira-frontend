import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User, UserGender, UserRoles, UserStatus} from "../../../shared/model/user";
import {defer, of} from "rxjs";
import {Project, ProjectStatus} from "../../../shared/model/project";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
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

  private readonly mockProjects: Partial<Project>[] = [
    {
      id: 1,
      name: 'project 1',
      description: 'project 1 description',
      entityType: 0,
      status: ProjectStatus.Pending
    },
    {
      id: 2,
      name: 'project 2',
      description: 'project 2 description',
      entityType: 0,
      status: ProjectStatus.Progress
    },
    {
      id: 3,
      name: 'project 3',
      description: 'project 3 description',
      entityType: 0,
      status: ProjectStatus.Done
    }
  ]

  constructor(private readonly httpClient: HttpClient, private readonly userService: UserService) {
  }

  async getProjectsByUserId(userId: number) {
    const projects$ = of(this.mockProjects)

    const projects = await projects$.toPromise();

    const promises = projects.map(p => defer(() => this.userService.getUsersByProjectId(p.id!)).toPromise());
    const usersResponse = await Promise.all(promises)
    usersResponse.map((users, promiseOrder) => {
      projects[promiseOrder].userIds = users.map(u => u.id);
      projects[promiseOrder].pmId = users.find(u => u.role === UserRoles.PM)?.id || 0;
      projects[promiseOrder].leaderId = users.find(u => u.role === UserRoles.Leader)?.id || 0;
    })

    return projects as Project[];
  }
}
