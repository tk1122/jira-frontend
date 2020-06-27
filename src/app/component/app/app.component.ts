import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable, of} from "rxjs";
import {isLoggedIn} from "../../module/auth/auth.selectors";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'jira-frontend';
  isLoggedIn$: Observable<boolean> = of()

  constructor(private readonly store: Store) {
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn))
  }
}
