import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {select, Store} from "@ngrx/store";
import {filter, map, switchMap, withLatestFrom} from "rxjs/operators";
import {IssueService} from "./issue.service";
import {loadIssues, loadIssuesSuccess} from "./issue.actions";
import {isIssuesLoaded} from "./issue.selectors";


@Injectable()
export class IssueEffects {

  loadIssues$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadIssues),
      withLatestFrom(this.store.pipe(select(isIssuesLoaded))),
      filter(([_, isLoaded]) => !isLoaded),
      switchMap(([action, _]) => {
        return this.issueService.getIssuesByAssigneeId(action.assineeId).pipe(
          map(issues => loadIssuesSuccess({issues}))
        )
      })
    )
  })

  constructor(private actions$: Actions, private readonly store: Store, private readonly issueService: IssueService) {
  }
}
