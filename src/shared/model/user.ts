import {Role} from "./role";
import {BaseModel} from "./base.model";

export interface User extends BaseModel {
  username: string,
  fullname: string | null,
  status: UserStatus,
  gender: UserGender,
  skill: string | null,
  level: string | null,
  email: string | null,
  age: number | null,
  roleIds: number[]
}


export enum UserStatus {
  Unactivated,
  Activated,
  Blocked,
}

export enum UserGender {
  Male,
  Female,
  Others,
}
