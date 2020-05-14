import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AuthActions} from "../../../auth/auth.actions";
import {IssueActions} from "../../issue.actions";
import {AuthSelectors} from "../../../auth/auth.selectors";
import {filter, tap, withLatestFrom} from "rxjs/operators";
import {IssueSelectors} from "../../issue.selectors";


@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {

  constructor(private readonly store: Store) {
  }

  ngOnInit(): void {
    this.store.pipe(
      select(AuthSelectors.selectUserId),
      withLatestFrom(this.store.pipe(select(IssueSelectors.selectIsAllIssuesLoaded))),
      tap(() => console.log('Issue component init')),

      filter(([userId, isIssuesLoaded])  => userId != undefined && !isIssuesLoaded),
      tap(([userId, _]) => {
        console.log('Issue component init')

        if (userId) {
          this.store.dispatch(IssueActions.loadIssues({assineeId: userId}))
        }
      }))
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
