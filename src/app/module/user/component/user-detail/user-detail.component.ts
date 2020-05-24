import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {user} from "../../user.selectors";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {User} from "../../../../../shared/model/user";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user$: Observable<User | undefined> = of()

  constructor(private readonly store: Store, private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.user$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.store.pipe(select(user, {id: Number(params.get('id'))}))
      })
    )
  }

}
