import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {IssueActions} from "../../issue.actions";
import {AuthSelectors} from "../../../auth/auth.selectors";
import {filter, tap, withLatestFrom} from "rxjs/operators";
import {IssueSelectors} from "../../issue.selectors";
import {Observable, of} from "rxjs";
import {Issue} from "../../../../../shared/model/issue";


@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {
  allIssues$: Observable<Issue[]> = of([]);
  todoIssues$: Observable<Issue[]> = of([]);
  inProgressIssues$: Observable<Issue[]> = of([]);
  finishedIssues$: Observable<Issue[]> = of([]);
  checkingIssues$: Observable<Issue[]> = of([]);
  reopenedIssues$: Observable<Issue[]> = of([]);
  doneIssues$: Observable<Issue[]> = of([]);

  constructor(private readonly store: Store) {
  }

  ngOnInit(): void {
    this.store.pipe(
      select(AuthSelectors.selectUserId),
      withLatestFrom(this.store.pipe(select(IssueSelectors.selectIsAllIssuesLoaded))),
      filter(([userId, isIssuesLoaded]) => userId != undefined && !isIssuesLoaded),
      tap(([userId, _]) => {
        if (userId) {
          this.store.dispatch(IssueActions.loadIssues({assineeId: userId}))
        }
      })).subscribe()

    this.allIssues$ = this.store.pipe(
      select(IssueSelectors.selectAllIssues)
    )

    this.inProgressIssues$ = this.store.pipe(
      select(IssueSelectors.selectAllInProgressIssues)
    )

    this.todoIssues$ = this.store.pipe(
      select(IssueSelectors.selectAllTodoIssues)
    )

    this.finishedIssues$ = this.store.pipe(
      select(IssueSelectors.selectAllFinishedIssues)
    )

    this.checkingIssues$ = this.store.pipe(
      select(IssueSelectors.selectAllCheckingIssues)
    )

    this.reopenedIssues$ = this.store.pipe(
      select(IssueSelectors.selectAllReopenedIssues)
    )

    this.doneIssues$ = this.store.pipe(
      select(IssueSelectors.selectAllDoneIssues)
    )
  }
}
