import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {AuthActions} from "../../../auth/auth.actions";
import {AuthSelectors} from "../../../auth/auth.selectors";
import {filter, map} from "rxjs/operators";
import {AuthInfo} from "../../../../../shared/model/auth-info";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username$: Observable<string> | undefined;
  constructor(private readonly store: Store) {
  }

  ngOnInit(): void {
    this.username$ = this.store.pipe(
      select(AuthSelectors.selectUser),
      filter((user): user is AuthInfo => user !== undefined),
      map(user => user.username)
    )
  }

  logout() {
    this.store.dispatch(AuthActions.logout())
  }
}
