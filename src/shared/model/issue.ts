export interface Issue {
  id: number,
  name: string,
  desciption: string,
  assignee_id: number,
  reporter_id: number,
  story_point: number,
  priority: IssuePriority,
  sprint_id: number,
  type: IssueType,
  status: IssueStatus,
  entity_type: ISSUE_ENTITY_TYPE
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
