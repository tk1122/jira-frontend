import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {ActivatedRoute} from "@angular/router";
import {tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {User} from "../../../../../shared/model/user";
import {selectUser} from "../../user.actions";
import {Role} from "../../../../../shared/model/role";
import {selectedUser, selectedUserRoles} from "../../user.selectors";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  selectedUser$: Observable<User | undefined> = of()
  selectedUserRoles$: Observable<Role[] | undefined> = of()

  constructor(private readonly store: Store, private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      tap((params) => {
        this.store.dispatch(selectUser({id: Number(params.get('id'))}))
      }),
    ).subscribe()

    this.selectedUser$ = this.store.pipe(select(selectedUser))

    this.selectedUserRoles$ = this.store.pipe(select(selectedUserRoles))
  }

}
