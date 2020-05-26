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

export const userStatusOptions = [
  {label: 'Unactivated', value: 0},
  {label: 'Activated', value: 1},
  {label: 'Blocked', value: 2}
]

export enum UserGender {
  Male,
  Female,
  Other,
}

export const userGenderOptions = [
  {label: 'Male', value: 0},
  {label: 'Female', value: 1},
  {label: 'Other', value: 2}
]
