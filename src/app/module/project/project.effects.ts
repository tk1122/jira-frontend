import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ProjectActions} from "./project.actions";
import {mergeMap} from "rxjs/operators";
import {ProjectService} from "./project.service";
import {UserService} from "../user/user.service";


@Injectable()
export class ProjectEffects {
  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.loadProjects),
      mergeMap(action =>
        this.projectService.getProjectsByUserId(action.userId).then(projects => {
          return ProjectActions.loadProjectsSuccess({projects})
        })
      )
    )
  )

  constructor(private actions$: Actions, private readonly projectService: ProjectService, private readonly userService: UserService) {
  }

}
