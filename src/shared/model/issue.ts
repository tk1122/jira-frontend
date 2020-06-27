import {BaseContentModel} from "./base.model";

export interface Issue extends BaseContentModel {
  entityType: IssueEntityType
  storyPoint: number,
  status: IssueStatus,
  priority: IssuePriority,
  type: IssueType,
  assigneeId: number,
  reporterId: number,
  projectId: number,
  epicId: number,
  sprintId: number,
  labelIds: number[]
}

export enum IssueStatus {
  Todo,
  Doing,
  Testing,
  Done,
}

export enum IssuePriority {
  Low,
  Medium,
  High,
}

export enum IssueType {
  Story,
  Task,
  Bug,
}

export type IssueEntityType = 3;

