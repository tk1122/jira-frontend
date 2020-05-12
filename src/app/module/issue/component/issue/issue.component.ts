import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AuthActions} from "../../../auth/auth.actions";


@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {

  constructor(private readonly store: Store) {
  }
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
  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
