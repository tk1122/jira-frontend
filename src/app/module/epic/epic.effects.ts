import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {createEpic, loadEpicFailure, loadEpics, loadEpicsSuccess} from "./epic.actions";
import {catchError, filter, map, mergeMap, switchMap, tap, withLatestFrom} from "rxjs/operators";
import {EpicService} from "./epic.service";
import {UserService} from "../user/user.service";
import {select, Store} from "@ngrx/store";
import {ErrorMessage} from "../../../shared/model/error-message";
import {of} from "rxjs";
import {loadIssuesByProjectId, loadIssuesByProjectIdSuccess} from "../issue/issue.actions";
import {IssueService} from "../issue/issue.service";
import {selectProject} from "../project/project.actions";
import {selectedProjectId} from "./epic.selectors";


@Injectable()
export class EpicEffects {

  loadEpics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEpics),
      withLatestFrom(this.store.pipe(select(selectedProjectId))),
      tap(a => console.log(a)),
      filter(([{projectId}, projectSelectedId]) => {
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
      withLatestFrom(this.store.pipe(select(selectedProjectId))),
      tap(x => console.log(x)),
      filter(([{projectId}, projectSelectedId]) => {
        return !projectSelectedId || Number(projectId) !== projectSelectedId
      }),
      switchMap((([action, _]) => {
          console.log(action)
          return this.issueService.getIssuesByProjectId(action.projectId).pipe(
            map(issues => loadIssuesByProjectIdSuccess({issues}))
          )
        })
      ))
  })

  // createEpic$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(createEpic),
  //     withLatestFrom(this.store.pipe(select(selectedProjectId))),
  //     tap(x => console.log(x)),
  //     filter(([{projectId}, projectSelectedId]) => {
  //       return !projectSelectedId || Number(projectId) !== projectSelectedId
  //     }),
  //   )
  // })

  constructor(private actions$: Actions, private readonly epicService: EpicService, private readonly userService: UserService, private readonly issueService: IssueService, private readonly store: Store) {
  }
}
