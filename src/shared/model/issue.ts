export interface Issue {
  id: number,
  name: string,
  description: string,
  assigneeId: number,
  reporterId: number,
  storyPoint: number,
  priority: IssuePriority,
  sprintId: number,
  type: IssueType,
  status: IssueStatus,
  entityType: ISSUE_ENTITY_TYPE
}

export const enum IssuePriority {
  Low,
  Medium,
  High
}

export const enum IssueType {
  Story,
  Task,
  Bug
}

export const enum IssueStatus {
  Todo,
  InProgress,
  Done,
  Checking,
  Finished,
  Reopened
}

export type ISSUE_ENTITY_TYPE = 3;
