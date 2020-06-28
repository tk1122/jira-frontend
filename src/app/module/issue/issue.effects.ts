import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {Action, select, Store} from "@ngrx/store";
import {filter, map, switchMap, tap, withLatestFrom} from "rxjs/operators";
import {IssueService} from "./issue.service";
import {loadIssues, loadIssuesByProjectId, loadIssuesByProjectIdSuccess, loadIssuesSuccess} from "./issue.actions";
import {isIssuesLoaded, isProjectIssuesLoaded} from "./issue.selectors";


@Injectable()
export class IssueEffects{

  loadIssues$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadIssues),
      withLatestFrom(this.store.pipe(select(isIssuesLoaded))),
      filter(([_, isLoaded]) => !isLoaded),
      switchMap(([action, _]) => {
        return this.issueService.getIssuesByAssigneeId().pipe(
          map(issues => loadIssuesSuccess({issues}))
        )
      })
    )
  })

  // loadIssuesByProjectId$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(loadIssuesByProjectId),
  //     tap((a) => console.log(a)),
  //     withLatestFrom(this.store.pipe(select(isProjectIssuesLoaded))),
  //     filter(([_, isLoaded]) => !isLoaded),
  //     switchMap((([action, _]) => {
  //       console.log(action)
  //       return this.issueService.getIssuesByProjectId(action.projectId).pipe(
  //         map(issues => loadIssuesByProjectIdSuccess({issues}))
  //       )
  //     })
  //   ))
  // })

  constructor(private actions$: Actions, private readonly store: Store, private readonly issueService: IssueService) {
  }
}
