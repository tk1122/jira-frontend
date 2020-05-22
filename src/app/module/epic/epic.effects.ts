import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {loadEpicFailure, loadEpics, loadEpicsSuccess} from "./epic.actions";
import {catchError, filter, map, switchMap, tap, withLatestFrom} from "rxjs/operators";
import {EpicService} from "./epic.service";
import {UserService} from "../user/user.service";
import {select, Store} from "@ngrx/store";
import {epics, isEpicsLoaded} from "./epic.selectors";
import {ErrorMessage} from "../../../shared/model/error-message";
import {of} from "rxjs";


@Injectable()
export class EpicEffects {

  loadEpics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEpics),
      withLatestFrom(this.store.pipe(select(isEpicsLoaded))),
      filter(([_, isLoaded]) => !isLoaded),
      switchMap(([action, _]) =>
        this.epicService.getEpicByProjectId().pipe(
          map(epics => {
            return loadEpicsSuccess({epics})
          }),
          tap(epics => {
            console.log(epics)
          }),
          catchError((err: ErrorMessage) => {
            return of(loadEpicFailure({message: err}))
          })
        )
      )
    )
  )

  loadEpicFailure$ = createEffect(() => this.actions$.pipe(
    ofType(loadEpicFailure),
  ), {dispatch: false})

  constructor(private actions$: Actions, private readonly epicService: EpicService, private readonly userService: UserService, private readonly store: Store) {
  }

}
