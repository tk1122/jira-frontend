import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from "@ngrx/store";
import {exhaustMap, map} from "rxjs/operators";
import {IssueService} from "./issue.service";
import {IssueActions} from "./issue.actions";


@Injectable()
export class IssueEffects {

  loadIssues$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(IssueActions.loadIssues),
      exhaustMap((action) => {
        return this.issueService.getIssuesByAssigneeId(action.assineeId).pipe(
          map(issues => IssueActions.loadIssuesSuccess({issues}))
        )
      })
    )
  })

  constructor(private actions$: Actions, private readonly store: Store, private readonly issueService: IssueService) {
  }
}
