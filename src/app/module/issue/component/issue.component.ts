import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AuthActions} from "../../auth/auth.actions";


@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {

  constructor(private readonly store: Store) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
