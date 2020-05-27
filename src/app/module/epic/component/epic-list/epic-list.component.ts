import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {Epic} from "../../../../../shared/model/epic";
import {select, Store} from "@ngrx/store";
import {userId} from "../../../auth/auth.selectors";
import {loadEpics, selectEpic, selectProject} from "../../epic.actions";
import {epic, epics} from "../../epic.selectors";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {filter, map, switchMap, tap, withLatestFrom} from "rxjs/operators";
import {loadIssuesByProjectId} from "../../../issue/issue.actions";
import {Issue} from "../../../../../shared/model/issue";

interface ParentItemData {
  key: number;
  name: string;
  platform: string;
  version: string;
  upgradeNum: number | string;
  creator: string;
  createdAt: string;
  expand: boolean;
}

interface ChildrenItemData {
  key: number;
  name: string;
  date: string;
  upgradeNum: string;
}

@Component({
  selector: 'app-epic-list',
  templateUrl: './epic-list.component.html',
  styleUrls: ['./epic-list.component.scss']
})
export class EpicListComponent implements OnInit {
  epics$: Observable<(Epic | {expand: boolean, key: number, issues: Issue[]})[]> = of([]);
  epic$: Observable<(Epic | {expand: boolean, key: number, issues: Issue[]})[]> = of([]);
  isVisible = false;
  listOfParentData: ParentItemData[] = [];
  listOfChildrenData: ChildrenItemData[] = [];

  constructor(
    private route: ActivatedRoute,
    private readonly store: Store
  ) {
  }

  ngOnInit(): void {
    for (let i = 0; i < 3; ++i) {
      this.listOfParentData.push({
        key: i,
        name: 'Screem',
        platform: 'iOS',
        version: '10.3.4.5654',
        upgradeNum: 500,
        creator: 'Jack',
        createdAt: '2014-12-24 23:12:00',
        expand: false
      });
    }
    for (let i = 0; i < 3; ++i) {
      this.listOfChildrenData.push({
        key: i,
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: `${i}`
      });
    }

    this.route
      .paramMap
      .pipe(
        switchMap(params => (
          params.get('id') || ''
        ))
      ).subscribe(([projectId, _]) => {
        this.store.dispatch(loadEpics({projectId}))
        this.store.dispatch(loadIssuesByProjectId({projectId}))
        this.store.dispatch(selectProject({id: Number(projectId)}))
    })

    this.epic$ = this.store.pipe(select(epic))
  }

  // handleClick(id:number) {
  //   this.store.dispatch(selectEpic({id}))
  // }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
