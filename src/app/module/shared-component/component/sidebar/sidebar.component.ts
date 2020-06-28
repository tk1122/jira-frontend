import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable, of} from "rxjs";
import {user} from "../../../user/user.selectors";
import {Project} from "../../../../../shared/model/project";
import {selectedProject} from "../../../project/project.selectors";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  selectedProject$: Observable<Project | undefined> = of();
  constructor(
    private readonly store: Store
  ) { }

  ngOnInit(): void {
  this.selectedProject$ = this.store.select(selectedProject)
  }

}
