import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {addIssueToSprint, loadSprints, selectProject, updateActiveSprint} from "../../sprint.actions";
import {delay, switchMap} from "rxjs/operators";
import {loadIssuesByProjectId} from "../../../issue/issue.actions";
import {ActivatedRoute} from "@angular/router";
import {Observable, of} from "rxjs";
import {Epic} from "../../../../../shared/model/epic";
import {Issue} from "../../../../../shared/model/issue";
import {Sprint} from "../../../../../shared/model/sprint";
import {backlogs, sprint} from "../../sprint.selectors";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop'
import {NzFormatBeforeDropEvent, NzFormatEmitEvent} from "ng-zorro-antd";
import {Update} from "@ngrx/entity";
import {User} from "../../../../../shared/model/user";
import {updateUser} from "../../../user/user.actions";

@Component({
  selector: 'app-sprint-list',
  templateUrl: './sprint-list.component.html',
  styleUrls: ['./sprint-list.component.scss']
})
export class SprintListComponent implements OnInit {
  sprints$: Observable<(Sprint | { active: boolean, issues: Issue[] })[]> = of([]);
  backlogs$: Observable<Issue[]> = of([]);
  currentIssue: Issue | undefined;

  constructor(
    private route: ActivatedRoute,
    private readonly store: Store,
  ) { }

  ngOnInit(): void {
    this.route
      .paramMap
      .pipe(
        switchMap(params => (
          params.get('id') || ''
        ))
      ).subscribe(([projectId, _]) => {

      this.store.dispatch(loadSprints({projectId}))
      this.store.dispatch(loadIssuesByProjectId({projectId}))
      this.store.dispatch(selectProject({id: Number(projectId)}))
      console.log(projectId)
    })
    console.log('-----------')
    this.sprints$ = this.store.pipe(select(sprint))
    this.backlogs$ = this.store.pipe(select(backlogs))
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      this.currentIssue = event.container.data[event.currentIndex] as unknown as Issue
      let a = event.container.data[event.container.data.length - 1] as unknown as Issue
      console.log(this.currentIssue)
      this.currentIssue = {...this.currentIssue, sprintId: a.sprintId}
      console.log(event)
      console.log(a.sprintId)
      const issue: Update<Issue> = {
        id: this.currentIssue.id,
        changes: {
          id: this.currentIssue.id,
          sprintId: this.currentIssue.sprintId
        }
      }
      console.log(issue)
      this.store.dispatch(addIssueToSprint({issue}))
    }
  }

  onActiveChange(event: boolean, sprintId: number) {
    console.log(event)
    console.log(sprintId)
    const sprint: Update<Sprint> = {
      id: sprintId,
      changes: {
        id: sprintId,
        active: event
      }
    }
    console.log(sprint)
    this.store.dispatch(updateActiveSprint({sprint}))
  }

}
