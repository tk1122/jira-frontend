import {UserStatus} from "./user";

export interface AuthInfo {
  username: string,
  userId: number,
  role: number[],
  accessToken: string,
  status: UserStatus,
  isAdmin: boolean
}
