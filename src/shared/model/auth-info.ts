import {UserStatus} from "./user";

export interface AuthInfo {
  username: string,
  userId: number,
  accessToken: string,
  status: UserStatus,
  isAdmin: boolean
}
