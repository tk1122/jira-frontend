import { createAction, props } from '@ngrx/store';

export const loadIssues = createAction(
  '[Issue] Load Issues'
);

export const loadIssuesSuccess = createAction(
  '[Issue] Load Issues Success',
  props<{ data: any }>()
);

export const loadIssuesFailure = createAction(
  '[Issue] Load Issues Failure',
  props<{ error: any }>()
);
