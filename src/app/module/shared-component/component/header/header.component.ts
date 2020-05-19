import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {user, isAdmin } from "../../../auth/auth.selectors";
import {filter, map} from "rxjs/operators";
import {AuthInfo} from "../../../../../shared/model/auth-info";
import {logout} from "../../../auth/auth.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username$: Observable<string> | undefined;
  isAdmin$: Observable<boolean> | undefined;
  constructor(private readonly store: Store) {
  }

  ngOnInit(): void {
    this.username$ = this.store.pipe(
      select(user),
      filter((user): user is AuthInfo => user !== undefined),
      map(user => user.username)
    )
    this.isAdmin$ = this.store.pipe(
      select(user),
      filter((user): user is AuthInfo => user !== undefined),
      map(user => user.isAdmin)
    )
  }

  logout() {
    this.store.dispatch(logout())
  }
}
