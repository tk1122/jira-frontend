import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {Epic} from "../../../../../shared/model/epic";
import {select, Store} from "@ngrx/store";
import {userId} from "../../../auth/auth.selectors";
import {loadEpics} from "../../epic.actions";
import {epics} from "../../epic.selectors";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {filter, map, switchMap, tap, withLatestFrom} from "rxjs/operators";
import {createLogErrorHandler} from "@angular/compiler-cli/ngcc/src/execution/tasks/completion";

@Component({
  selector: 'app-epic-list',
  templateUrl: './epic-list.component.html',
  styleUrls: ['./epic-list.component.scss']
})
export class EpicListComponent implements OnInit {
  epic$: Observable<Epic[]> = of([]);
  isVisible = false;

  constructor(
    private route: ActivatedRoute,
    private readonly store: Store
  ) {
  }

  ngOnInit(): void {
    this.route
      .paramMap
      .pipe(
        switchMap(params => (
          params.get('id') || ''
        )),
        withLatestFrom(this.store.pipe(
          select(userId)
        )),
        filter(([projectId, userId]) => userId !== undefined)
      ).subscribe(([projectId, userId]) => {
      return this.store.dispatch(loadEpics({projectId}))
    })

    this.epic$ = this.store.pipe(select(epics))
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
