import {UserRoles, UserStatus} from "./user";

export interface AuthInfo {
  username: string,
  id: number,
  role: UserRoles,
  token: string,
  status: UserStatus
}
