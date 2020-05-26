import {BaseContentModel} from "./base.model";

export enum SprintStatus {
  Pending,
  InProgress,
  Finished,
}

export type SprintEntityType = 2;

export interface Sprint extends BaseContentModel{
  startTime: Date | null
  finishTime: Date | null
  totalStoryPoint: number
  status: SprintStatus
  entityType: SprintEntityType
  projectId: number
}
