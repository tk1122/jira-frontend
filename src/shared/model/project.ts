import {BaseModel} from "./base.model";

export interface Project extends BaseModel {
  status: ProjectStatus,
  entityType: ProjectEntityType,
  pmId: number,
  leaderId: number,
  memberIds: number[]
}

export enum ProjectStatus {
  Pending,
  InProgress,
  Done,
}

export type ProjectEntityType = 0;

