import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {Action, select, Store} from "@ngrx/store";
import {filter, map, switchMap, withLatestFrom} from "rxjs/operators";
import {IssueService} from "./issue.service";
import {loadIssues, loadIssuesSuccess} from "./issue.actions";
import {isIssuesLoaded} from "./issue.selectors";


@Injectable()
export class IssueEffects implements OnInitEffects {

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

  constructor(private actions$: Actions, private readonly store: Store, private readonly issueService: IssueService) {
  }

  ngrxOnInitEffects(): Action {
    return loadIssues({})
  }
}
