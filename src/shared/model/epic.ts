

export interface Epic {
  id: number,
  createdAt: Date,
  updatedAt: Date,
  name: string,
  description: string,
  startDate: Date,
  endDate: Date,
  entityType: 1,
  projectId: number
}
