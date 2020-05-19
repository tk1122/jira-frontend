import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {loadIssues} from "../../issue.actions";
import {userId} from "../../../auth/auth.selectors";
import {tap} from "rxjs/operators";
import {
  checkingIssues,
  doneIssues,
  finishedIssues,
  inProgressIssues,
  issues,
  reopenedIssues,
  todoIssues
} from "../../issue.selectors";
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
      select(userId),
      tap((userId) => {
        if (userId) {
          this.store.dispatch(loadIssues({assineeId: userId}))
        }
      })).subscribe()

    this.allIssues$ = this.store.pipe(
      select(issues)
    )

    this.inProgressIssues$ = this.store.pipe(
      select(inProgressIssues)
    )

    this.todoIssues$ = this.store.pipe(
      select(todoIssues)
    )

    this.finishedIssues$ = this.store.pipe(
      select(finishedIssues)
    )

    this.checkingIssues$ = this.store.pipe(
      select(checkingIssues)
    )

    this.reopenedIssues$ = this.store.pipe(
      select(reopenedIssues)
    )

    this.doneIssues$ = this.store.pipe(
      select(doneIssues)
    )
  }
}
