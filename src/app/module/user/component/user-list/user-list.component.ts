import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {select, Store} from "@ngrx/store";
import {User} from "../../../../../shared/model/user";
import {userId} from "../../../auth/auth.selectors";
import {loadProjects} from "../../../project/project.actions";
import {projects} from "../../../project/project.selectors";
import {loadUsers} from "../../user.actions";
import {users} from "../../user.selectors";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]> = of([])

  constructor(
    private readonly store: Store
  ) {
  }

  ngOnInit(): void {
    this.store.pipe(select(userId)).subscribe(userId => {
      if (userId) {
        this.store.dispatch(loadUsers({}))
      }
    })

    this.users$ = this.store.pipe(select(users))
  }

}
