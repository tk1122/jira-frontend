import {createAction, props} from '@ngrx/store';
import {Issue} from "../../../shared/model/issue";
import {ErrorMessage} from "../../../shared/model/error-message";

const loadIssues = createAction(
  '[Issue Page] Load Issues',
  props<{ assineeId: number }>()
);

const loadIssuesSuccess = createAction(
  '[Issue API] Load Issues Success',
  props<{ issues: Issue[] }>()
);

const loadIssuesFailure = createAction(
  '[Issue API] Load Issues Failure',
  props<{ error: ErrorMessage }>()
);

export const IssueActions = {loadIssues, loadIssuesSuccess, loadIssuesFailure}
