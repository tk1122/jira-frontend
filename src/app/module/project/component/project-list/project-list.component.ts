import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {Project} from "../../../../../shared/model/project";
import {select, Store} from "@ngrx/store";
import {ProjectActions} from "../../project.actions";
import {AuthSelectors} from "../../../auth/auth.selectors";
import {ProjectSelectors} from "../../project.selectors";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  constructor(
    private readonly store: Store
  ) { }
  projects$: Observable<Project[]> = of([])
  ngOnInit(): void {
    this.store.pipe(select(AuthSelectors.selectUserId)).subscribe(userId => {
      if (userId) {
        this.store.dispatch(ProjectActions.loadProjects({userId}))
      }
    })

    this.projects$ = this.store.pipe(select(ProjectSelectors.selectProjects))
  }
}
