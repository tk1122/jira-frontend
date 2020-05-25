import {BaseContentModel} from "./base.model";

export interface Project extends BaseContentModel {
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

