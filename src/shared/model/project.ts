export interface Project {
  name: string,
  description: string,
  status: ProjectStatus,
  entityType: 0,
  pmId: number,
  leaderId: number,
  userIds: number[]
}

export const enum ProjectStatus {
  Pending,
  Progress,
  Done
}
