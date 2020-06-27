import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {Project} from "../../../../../shared/model/project";
import {select, Store} from "@ngrx/store";
import {loadProjects, selectProject} from "../../project.actions";
import {userId} from "../../../auth/auth.selectors";
import {projects} from "../../project.selectors";
import {Router} from "@angular/router";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects$: Observable<Project[]> = of([])

  constructor(
    private readonly store: Store,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.projects$ = this.store.pipe(select(projects))
  }

  handleClick(id: number) {
    this.router.navigate(['/projects', id, 'epics']).then()
  }
}
