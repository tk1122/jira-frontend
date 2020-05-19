import {Role} from "./role";

export interface User {
  username: string,
  id: number,
  fullname: string,
  status: UserStatus,
  skill: string,
  level: string,
  email: string,
  age: number,
  gender: UserGender,
  roles: Role[],
}


export const enum UserGender {
  Male,
  Female,
  Others
}

export const enum UserStatus {
  Unactivated,
  Activated,
  Blocked,
}
