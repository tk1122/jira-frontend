import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AuthActions} from "../../../auth/auth.actions";
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

  listOfData = [
    {
      key: '1',
      name: 'John Brown',
      status: 'todo'
    },
    {
      key: '2',
      name: 'John Brown',
      status: 'todo'
    },
    {
      key: '3',
      name: 'John Brown',
      status: 'todo'
    },
  ];

  allIssues$: Observable<Issue[]> = of([]);

  constructor(private readonly store: Store) {
  }

  ngOnInit(): void {
    this.store.pipe(
      select(AuthSelectors.selectUserId),
      withLatestFrom(this.store.pipe(select(IssueSelectors.selectIsAllIssuesLoaded))),
      filter(([userId, isIssuesLoaded])  => userId != undefined && !isIssuesLoaded),
      tap(([userId, _]) => {
        if (userId) {
          this.store.dispatch(IssueActions.loadIssues({assineeId: userId}))
        }
      })).subscribe()

      this.allIssues$ = this.store.pipe(
        select(IssueSelectors.selectAllIssues)
      )
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
