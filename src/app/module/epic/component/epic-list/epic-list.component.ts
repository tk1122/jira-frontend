import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {Epic} from "../../../../../shared/model/epic";
import {select, Store} from "@ngrx/store";
import {loadEpics, selectProject} from "../../epic.actions";
import {epic} from "../../epic.selectors";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {loadIssuesByProjectId} from "../../../issue/issue.actions";
import {Issue} from "../../../../../shared/model/issue";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {signup} from "../../../auth/auth.actions";

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
  epics$: Observable<(Epic | { expand: boolean, key: number, issues: Issue[] })[]> = of([]);
  epic$: Observable<(Epic | { expand: boolean, key: number, issues: Issue[] })[]> = of([]);
  isVisible = false;
  validateForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private readonly store: Store,
    private fb: FormBuilder
  ) {
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validateForm.controls.password.value) {
      return {confirm: true, error: true};
    }
    return {};
  };

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      console.log(this.validateForm.value)
      console.log(this.validateForm.value.rangePicker[0].toISOString())
      // this.store.dispatch(signup(this.validateForm.value))
    }
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

    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      rangePicker: [[]],
    });
    this.epic$ = this.store.pipe(select(epic))
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
