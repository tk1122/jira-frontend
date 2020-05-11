export interface User {
  username: string,
  id: number,
  role: UserRoles,
  token: string,
  status: UserStatus
}

export const enum UserRoles {
  Admin,
  PM,
  Leader,
  Dev
}

export const enum UserStatus {
  Active,
  Blocked
}
