import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable, of} from "rxjs";
import {user} from "../../../user/user.selectors";
import {Project} from "../../../../../shared/model/project";
import {projectSelected} from "../../../project/project.selectors";

@Component({
  selector: 'app-epic-sidebar',
  templateUrl: './epic-sidebar.component.html',
  styleUrls: ['./epic-sidebar.component.scss']
})
export class EpicSidebarComponent implements OnInit {
  projectSelected$: Observable<Project | undefined> = of();
  constructor(
    private readonly store: Store
  ) { }

  ngOnInit(): void {
  this.projectSelected$ = this.store.select(projectSelected)
  }

}
