export interface User {
  username: string,
  id: number,
  role: UserRoles,
  status: UserStatus,
  skill: string,
  level: string,
  email: string,
  age: number,
  gender: UserGender
}

export const enum UserGender {
  Male,
  Female
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
