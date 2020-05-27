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
import {loadIssuesByProjectId, loadIssuesByProjectIdSuccess} from "../issue/issue.actions";
import {isProjectIssuesLoaded} from "../issue/issue.selectors";
import {IssueService} from "../issue/issue.service";
import {projectSelectedId} from "../project/project.selectors";
import {selectProject} from "../project/project.actions";


@Injectable()
export class EpicEffects {

  loadEpics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEpics),
      tap(a => console.log(a)),
      withLatestFrom(this.store.pipe(select(projectSelectedId))),
      tap(a => console.log(a)),
      filter(([projectId, projectSelectedId]) => {
        return !projectSelectedId || Number(projectId) !== projectSelectedId
      }),
      switchMap(([action, _]) =>
        [this.epicService.getEpicByProjectId(action.projectId.toString()).pipe(
          map(epics => {
            return loadEpicsSuccess({epics})
          }),
          tap(epics => {
            console.log(epics)
          }),
          catchError((err: ErrorMessage) => {
            return of(loadEpicFailure({message: err}))
          }),
            selectProject({id: Number(action.projectId)})
          ]
        )
      )
    )
  )

  loadEpicFailure$ = createEffect(() => this.actions$.pipe(
    ofType(loadEpicFailure),
  ), {dispatch: false})

  loadIssuesByProjectId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadIssuesByProjectId),
      withLatestFrom(this.store.pipe(select(projectSelectedId))),
      // filter(([projectId, projectSelectedId]) => {
      //   return Number(projectId) !== projectSelectedId
      // }),
      switchMap((([action, _]) => {
          console.log(action)
          return this.issueService.getIssuesByProjectId(action.projectId).pipe(
            map(issues => loadIssuesByProjectIdSuccess({issues}))
          )
        })
      ))
  })

  constructor(private actions$: Actions, private readonly epicService: EpicService, private readonly userService: UserService, private readonly issueService: IssueService, private readonly store: Store) {
  }

}
