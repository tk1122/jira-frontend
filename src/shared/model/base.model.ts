export interface BaseModel {
  id: number
  createdAt: Date,
  updatedAt: Date,
}

export interface BaseContentModel extends BaseModel {
  name: string
  description: string
  entityType: number
}
