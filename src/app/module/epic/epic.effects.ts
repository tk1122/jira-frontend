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
        this.epicService.getEpicByProjectId(action.projectId.toString()).pipe(
          map(epics => {
            epics = epics.map(epic => {
              return {
                ...epic,
                timeLeft:  Number((((new Date(epic.endDate).getTime() - new Date().getTime()) /(new Date(epic.endDate).getTime() - new Date(epic.startDate).getTime())) * 100).toFixed(0))
              }
            })
            console.log(epics)
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
