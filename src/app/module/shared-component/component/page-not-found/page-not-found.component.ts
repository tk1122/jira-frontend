import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {isAdmin} from "../../../auth/auth.selectors";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private readonly router: Router, private readonly store: Store) {
  }

  ngOnInit(): void {
  }

  backHome() {
    this.store.pipe(
      select(isAdmin),
      tap(isAdmin => {
        if (isAdmin) {
          return this.router.navigateByUrl('/users').then()
        }

        return this.router.navigateByUrl('/issues').then()
      })
    ).subscribe()
  }
}
