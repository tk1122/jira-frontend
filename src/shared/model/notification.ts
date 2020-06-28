import {IssueEntityType} from "./issue";
import {ProjectEntityType} from "./project";
import {EpicEntityType} from "./epic";
import {SprintEntityType} from "./sprint";
import {BaseContentModel} from "./base.model";

// import Timestamp = firebase.firestore.Timestamp;

export interface Notification extends BaseContentModel {
  producerId: number;
  message: string;
  entityId: number;
  createdAt: Date;
  status: NotifStatus;
}

export enum NotifEventType {
  Created,
  Updated,
  AddedToProject,
  RemovedFromProject,
  IssueStatusChanged,
  StartSprint,
  FinishSprint,
  Assigned,
  AssigneeRemoved,
  ReporterRemoved,
  Reported,
  Deleted,
}

export type EntityType = IssueEntityType | ProjectEntityType | EpicEntityType | SprintEntityType;

export enum NotifStatus {
  Panding,
  Unread,
  Read,
}
