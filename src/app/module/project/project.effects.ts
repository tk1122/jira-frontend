import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  createProject,
  createProjectFailure,
  createProjectSuccess,
  loadProjectFailure,
  loadProjects,
  loadProjectsSuccess, updateProject, updateProjectFailure, updateProjectSuccess
} from "./project.actions";
import {catchError, filter, map, switchMap, withLatestFrom} from "rxjs/operators";
import {ProjectService} from "./project.service";
import {UserService} from "../user/user.service";
import {select, Store} from "@ngrx/store";
import {isProjectsLoaded} from "./project.selectors";
import {ErrorMessage} from "../../../shared/model/error-message";
import {of} from "rxjs";


@Injectable()
export class ProjectEffects {

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

  createProject$ = createEffect(() => this.actions$.pipe(
    ofType(createProject),
    switchMap(action => this.projectService.createProject(action.project).pipe(
      map(project => createProjectSuccess({project: action.project})),
      catchError((err: ErrorMessage) => of(createProjectFailure({message: err})))
    ))
  ));

  updateProject$ = createEffect(() => this.actions$.pipe(
    ofType(updateProject),
    switchMap(action => this.projectService.updateProject(action.project.id, action.project.changes).pipe(
      map(project => updateProjectSuccess({project})),
      catchError((err: ErrorMessage) => of(updateProjectFailure({message: err})))
    ))
  ));


  constructor(private actions$: Actions,
              private readonly projectService: ProjectService,
              private readonly userService: UserService,
              private readonly store: Store
  ) {
  }
}
