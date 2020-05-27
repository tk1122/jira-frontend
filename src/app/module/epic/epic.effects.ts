import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {loadEpicFailure, loadEpics, loadEpicsSuccess} from "./epic.actions";
import {catchError, filter, map, mergeMap, switchMap, tap, withLatestFrom} from "rxjs/operators";
import {EpicService} from "./epic.service";
import {UserService} from "../user/user.service";
import {select, Store} from "@ngrx/store";
import {ErrorMessage} from "../../../shared/model/error-message";
import {of} from "rxjs";
import {loadIssuesByProjectId, loadIssuesByProjectIdSuccess} from "../issue/issue.actions";
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
        this.epicService.getEpicByProjectId(action.projectId.toString()).pipe(
          mergeMap(epics => {
            return [loadEpicsSuccess({epics}), selectProject({id: Number(action.projectId)})]
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
