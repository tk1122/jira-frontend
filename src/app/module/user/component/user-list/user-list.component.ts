import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {select, Store} from "@ngrx/store";
import {User} from "../../../../../shared/model/user";
import {isAdmin, userId} from "../../../auth/auth.selectors";
import {loadUsers} from "../../user.actions";
import {users} from "../../user.selectors";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]> = of([])
  isAdmin$: Observable<boolean | undefined> = of(false)

  constructor(
    private readonly store: Store
  ) {
  }

  ngOnInit(): void {
    this.users$ = this.store.pipe(select(users))
    this.isAdmin$ = this.store.pipe(select(isAdmin))
  }

}
