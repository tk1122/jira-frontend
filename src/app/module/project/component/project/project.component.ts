import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {userId} from "../../../auth/auth.selectors";
import {loadProjects} from "../../project.actions";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  constructor(private readonly store: Store) {
  }

  ngOnInit(): void {
    this.store.pipe(select(userId)).subscribe(userId => {
      if (userId) {
        this.store.dispatch(loadProjects({userId}))
      }
    })
  }

}
