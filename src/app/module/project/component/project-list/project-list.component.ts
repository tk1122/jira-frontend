import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {Project} from "../../../../../shared/model/project";
import {select, Store} from "@ngrx/store";
import {loadProjects} from "../../project.actions";
import {userId} from "../../../auth/auth.selectors";
import {projects} from "../../project.selectors";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects$: Observable<Project[]> = of([])

  constructor(
    private readonly store: Store
  ) {
  }

  ngOnInit(): void {
    this.store.pipe(select(userId)).subscribe(userId => {
      if (userId) {
        this.store.dispatch(loadProjects({userId}))
      }
    })

    this.projects$ = this.store.pipe(select(projects))
  }
}
