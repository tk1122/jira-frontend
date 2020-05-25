import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {loadProjectFailure, loadProjects, loadProjectsSuccess} from "./project.actions";
import {catchError, filter, map, switchMap, withLatestFrom} from "rxjs/operators";
import {ProjectService} from "./project.service";
import {UserService} from "../user/user.service";
import {Action, select, Store} from "@ngrx/store";
import {isProjectsLoaded} from "./project.selectors";
import {ErrorMessage} from "../../../shared/model/error-message";
import {of} from "rxjs";
import {userId} from "../auth/auth.selectors";


@Injectable()
export class ProjectEffects{

  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProjects),
      withLatestFrom(this.store.pipe(select(isProjectsLoaded))),
      filter(([_, isLoaded]) => !isLoaded),
      switchMap(([action, _]) =>
        this.projectService.getProjectsByUserId().pipe(
          map(projects => {
            return loadProjectsSuccess({projects})
          }),
          catchError((err: ErrorMessage) => {
            return of(loadProjectFailure({message: err}))
          })
        )
      )
    )
  )

  loadProjectFailure$ = createEffect(() => this.actions$.pipe(
    ofType(loadProjectFailure),
  ), {dispatch: false})

  constructor(private actions$: Actions, private readonly projectService: ProjectService, private readonly userService: UserService, private readonly store: Store) {
  }
}
