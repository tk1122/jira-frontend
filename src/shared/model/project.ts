export interface Project {
  name: string,
  description: string,
  status: ProjectStatus,
  pmId: number,
  leaderId: number,
  entityType: 0
}

export const enum ProjectStatus {
  Pending,
  Progress,
  Done
}
