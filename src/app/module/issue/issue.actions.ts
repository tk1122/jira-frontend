import {createAction, props} from '@ngrx/store';
import {Issue} from "../../../shared/model/issue";
import {ErrorMessage} from "../../../shared/model/error-message";

export const loadIssues = createAction(
  '[Issue Page] Load Issues',
  props<{}>()
);

export const loadIssuesByProjectId = createAction(
  '[Issue Page] Load Issues By Project',
  props<{projectId:string}>()
);

export const loadIssuesSuccess = createAction(
  '[Issue API] Load Issues Success',
  props<{ issues: Issue[] }>()
);

export const loadIssuesByProjectIdSuccess = createAction(
  '[Issue API] Load Issues By Project Success',
  props<{ issues: Issue[] }>()
);

export const loadIssuesFailure = createAction(
  '[Issue API] Load Issues Failure',
  props<{ error: ErrorMessage }>()
);
