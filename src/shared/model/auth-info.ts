import {UserRoles, UserStatus} from "./user";

export interface AuthInfo {
  username: string,
  userId: number,
  role: UserRoles[],
  accessToken: string,
  status: UserStatus,
  isAdmin: boolean
}
