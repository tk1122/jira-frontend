import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {Epic} from "../../../../../shared/model/epic";
import {select, Store} from "@ngrx/store";
import {createEpic, loadEpics, selectProject} from "../../epic.actions";
import {epic, isPmOfSelectedProject, selectedProjectId} from "../../epic.selectors";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {loadIssuesByProjectId} from "../../../issue/issue.actions";
import {Issue} from "../../../../../shared/model/issue";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {signup} from "../../../auth/auth.actions";
import {loadRoles} from "../../../user/user.actions";
import {Project} from "../../../../../shared/model/project";

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
  epic$: Observable<(Epic | { expand: boolean, key: number, issues: Issue[] })[]> = of([]);
  isVisible = false;
  validateForm!: FormGroup;
  isPm$: Observable<boolean> = of();

  constructor(
    private route: ActivatedRoute,
    private readonly store: Store,
    private fb: FormBuilder
  ) {
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      //@ts-ignore
      let result: Epic ={}
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      result.name = this.validateForm.value.name
      result.description = this.validateForm.value.description
      result.startDate = this.validateForm.value.rangePicker[0].toISOString()
      result.endDate = this.validateForm.value.rangePicker[1].toISOString()
      this.store.pipe(select(selectedProjectId)).subscribe(id => {
        if (id != null) {
          result.projectId = id
        }
      })
      console.log(result)
      this.store.dispatch(createEpic({epic: result}))
    }
    this.isVisible = false;
  }

  ngOnInit(): void {
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

    this.store.dispatch(loadRoles())

    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      rangePicker: [[]],
    });
    this.epic$ = this.store.pipe(select(epic))

    this.isPm$ = this.store.pipe(select(isPmOfSelectedProject))
  }

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
