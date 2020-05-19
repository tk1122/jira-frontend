export interface Project {
  id: number,
  name: string,
  description: string,
  status: ProjectStatus,
  pm: {
    id: number
  },
  leader: {
    id: number
  },
  entityType: 0,
  members: { id: number }[]
}

export const enum ProjectStatus {
  Pending,
  InProgress,
  Done
}
