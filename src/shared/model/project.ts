export interface Project {
  id: number,
  name: string,
  description: string,
  status: ProjectStatus,
  pmId: number,
  leaderId: number,
  entityType: 0,
  userIds: number[]
}

export const enum ProjectStatus {
  Pending,
  Progress,
  Done
}
