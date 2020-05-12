export interface Issue {
  id: number,
  name: string,
  desciption: string,
  assigneeId: number,
  reporterId: number,
  storyPoint: number,
  priority: IssuePriority,
  sprintId: number,
  type: IssueType,
  status: IssueStatus,
  entityType: ISSUE_ENTITY_TYPE
}

const enum IssuePriority {
  Low,
  Medium,
  High
}

const enum IssueType {
  Story,
  Task,
  Bug
}

const enum IssueStatus {
  Todo,
  InProgress,
  Done,
  Checking,
  Finished,
  Reopened
}

type ISSUE_ENTITY_TYPE = 3;
