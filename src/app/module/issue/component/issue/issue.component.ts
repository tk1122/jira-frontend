import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable, of} from "rxjs";
import {Issue} from "../../../../../shared/model/issue";
import {doingIssues, doneIssues, issues, testingIssues, todoIssues} from "../../issue.selectors";


@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {
  allIssues$: Observable<Issue[]> = of([]);
  todoIssues$: Observable<Issue[]> = of([]);
  doingIssues$: Observable<Issue[]> = of([]);
  testingIssues$: Observable<Issue[]> = of([]);
  doneIssues$: Observable<Issue[]> = of([]);

  constructor(private readonly store: Store) {
  }

  ngOnInit(): void {
    this.allIssues$ = this.store.pipe(
      select(issues)
    )

    this.doingIssues$ = this.store.pipe(
      select(doingIssues)
    )

    this.todoIssues$ = this.store.pipe(
      select(todoIssues)
    )

    this.testingIssues$ = this.store.pipe(
      select(testingIssues)
    )

    this.doneIssues$ = this.store.pipe(
      select(doneIssues)
    )
  }
}
