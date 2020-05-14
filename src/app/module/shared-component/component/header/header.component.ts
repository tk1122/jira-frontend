import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {AuthActions} from "../../../auth/auth.actions";
import {AuthSelectors} from "../../../auth/auth.selectors";
import {filter, map} from "rxjs/operators";
import {User} from "../../../../../shared/model/user";

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
      filter((user): user is User => user !== undefined),
      map(user => user.username)
    )
  }

}
