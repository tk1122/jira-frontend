import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {loadProjects, loadProjectsSuccess} from "./project.actions";
import {filter, switchMap, withLatestFrom} from "rxjs/operators";
import {ProjectService} from "./project.service";
import {UserService} from "../user/user.service";
import {select, Store} from "@ngrx/store";
import {isProjectsLoaded} from "./project.selectors";


@Injectable()
export class ProjectEffects {

  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProjects),
      withLatestFrom(this.store.pipe(select(isProjectsLoaded))),
      filter(([_, isLoaded]) => !isLoaded),
      switchMap(([action, _]) =>
        this.projectService.getProjectsByUserId(action.userId).then(projects => {
          return loadProjectsSuccess({projects})
        })
      )
    )
  )

  constructor(private actions$: Actions, private readonly projectService: ProjectService, private readonly userService: UserService, private readonly store: Store) {
  }

}
