import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {switchMap} from "rxjs/operators";
import {selectProject} from "../../../epic/epic.actions";
import {loadIssuesByProjectId} from "../../../issue/issue.actions";
import {select, Store} from "@ngrx/store";
import {addIssueToSprint, changeIssueStatus, loadSprints, updateActiveSprint} from "../../sprint.actions";
import {sprint, sprintBoards} from "../../sprint.selectors";
import {ActivatedRoute} from "@angular/router";
import {Observable, of} from "rxjs";
import {Sprint} from "../../../../../shared/model/sprint";
import {Issue} from "../../../../../shared/model/issue";
import {Update} from "@ngrx/entity";

@Component({
  selector: 'app-sprint-board',
  templateUrl: './sprint-board.component.html',
  styleUrls: ['./sprint-board.component.scss']
})
export class SprintBoardComponent implements OnInit {
  sprints$: Observable<(Sprint | { active: boolean, todoIssues: Issue[], doingIssues: Issue[], testingIssues: Issue[], doneIssues: Issue[]})[]> = of([]);
  currentIssue: Issue | undefined;
  screenHeight: number = 10000;

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
      console.log(projectId)
      this.store.dispatch(loadSprints({projectId}))
      this.store.dispatch(loadIssuesByProjectId({projectId}))
      this.store.dispatch(selectProject({id: Number(projectId)}))

    })
    this.sprints$ = this.store.pipe(select(sprintBoards))
  }


  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog',
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  drop(event: CdkDragDrop<string[]>) {
    console.log(event)
    this.screenHeight = document.body.scrollHeight
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
      this.currentIssue = {...this.currentIssue, status: a.status}
      console.log(event)
      console.log(a.sprintId)
      const issue: Update<Issue> = {
        id: this.currentIssue.id,
        changes: {
          id: this.currentIssue.id,
          status: this.currentIssue.status
        }
      }
      console.log(issue)
      this.store.dispatch(changeIssueStatus({issue}))
    }
  }
  //
  // ngAfterViewInit(): void{
  //   console.log(document.body.scrollHeight)
  //   this.screenHeight = document.body.scrollHeight
  // }

}
