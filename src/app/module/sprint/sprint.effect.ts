import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  addIssueToSprint, addIssueToSprintFailure,
  addIssueToSprintSuccess,
  loadSprintFailure,
  loadSprints,
  loadSprintsSuccess
} from "../sprint/sprint.actions";
import {catchError, filter, map, mergeMap, switchMap, tap, withLatestFrom} from "rxjs/operators";
import {createAction, select, Store} from "@ngrx/store";
import {selectedProjectId} from "./sprint.selectors";
import {selectProject} from "../project/project.actions";
import {ErrorMessage} from "../../../shared/model/error-message";
import {of} from "rxjs";
import {SprintService} from "../sprint/sprint.service";
import {UserService} from "../user/user.service";
import {IssueService} from "../issue/issue.service";
import {isProjectIssuesLoaded} from "../issue/issue.selectors";
import {loadIssuesSuccess} from "../issue/issue.actions";
import {updateUser, updateUserFailure, updateUserSuccess} from "../user/user.actions";


@Injectable()
export class SprintEffects {

  loadSprints$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSprints),
      withLatestFrom(this.store.pipe(select(selectedProjectId))),
      tap(a => console.log(a)),
      filter(([{projectId}, projectSelectedId]) => {
        return !projectSelectedId || Number(projectId) !== projectSelectedId
      }),
      switchMap(([action, _]) =>
        this.sprintService.getSprintByProjectId(action.projectId.toString()).pipe(
          mergeMap(sprints => {
            return [loadSprintsSuccess({sprints}), selectProject({id: Number(action.projectId)})]
          }),
          catchError((err: ErrorMessage) => {
            return of(loadSprintFailure({message: err}))
          })
        )
      )
    )
  )

  updateIssue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addIssueToSprint),
      switchMap(({issue: {id, changes: {sprintId}}}) =>
        this.issueService.updateIssue(id, sprintId).pipe(
          map(issue => addIssueToSprintSuccess()),
          catchError((err: ErrorMessage) => {
            return of(updateUserFailure({error: err}))
          })
        )
       )
    )
  )

  constructor(private actions$: Actions, private readonly sprintService: SprintService, private readonly userService: UserService, private readonly issueService: IssueService, private readonly store: Store) {
  }
}
