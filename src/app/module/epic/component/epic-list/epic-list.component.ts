import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {Epic} from "../../../../../shared/model/epic";
import {select, Store} from "@ngrx/store";
import {userId} from "../../../auth/auth.selectors";
import {loadEpics} from "../../epic.actions";
import {epics} from "../../epic.selectors";

@Component({
  selector: 'app-epic-list',
  templateUrl: './epic-list.component.html',
  styleUrls: ['./epic-list.component.scss']
})
export class EpicListComponent implements OnInit {
  epic$: Observable<Epic[]> = of([])

  constructor(
    private readonly store: Store
  ) {
  }

  ngOnInit(): void {
    this.store.pipe(select(userId)).subscribe(userId => {
      if (userId) {
        this.store.dispatch(loadEpics({userId}))
      }
    })

    this.epic$ = this.store.pipe(select(epics))
  }

}
