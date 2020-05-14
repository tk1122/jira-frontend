export interface User {
  username: string,
  id: number,
  skill: string,
  level: string,
  email: string,
  age: number,
  gender: UserGender,
  role: UserRoles,
  status: UserStatus,
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
