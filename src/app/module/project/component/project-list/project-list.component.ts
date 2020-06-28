import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {Project} from "../../../../../shared/model/project";
import {select, Store} from "@ngrx/store";
import {projects, selectedProject} from "../../project.selectors";
import {Router} from "@angular/router";
import {loadRoles, loadUsers} from "../../../user/user.actions";
import {isPm} from "../../../auth/auth.selectors";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../../shared/model/user";
import {leaders, members} from "../../../user/user.selectors";
import {createProject, selectProject, updateProject} from "../../project.actions";
import {Update} from "@ngrx/entity";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects$: Observable<Project[]> = of([]);
  leaders$: Observable<User[]> = of([]);
  members$: Observable<User[]> = of([]);
  isPm$: Observable<boolean | undefined> = of();
  projectForm?: FormGroup;
  isCreateModalVisible = false;
  isUpdateModalVisible = false;
  updateProjectForm?: FormGroup;

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      leaderId: ['', Validators.required],
      memberIds: [[], Validators.required],
    });
    this.updateProjectForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      leaderId: ['', Validators.required],
      memberIds: [[], Validators.required],
    });
  }

  ngOnInit(): void {
    this.projects$ = this.store.pipe(select(projects));
    this.store.dispatch(loadUsers());
    this.store.dispatch(loadRoles());
    this.isPm$ = this.store.pipe(select(isPm));
  }

  handleClick(id: number) {
    this.router.navigate(['/projects', id, 'epics']).then();
  }

  showCreateProjectModal(): void {
    this.isCreateModalVisible = true;
    this.leaders$ = this.store.pipe(select(leaders));
    this.members$ = this.store.pipe(select(members));
  }

  handleSubmitCreateProject(): void {
    this.store.dispatch(createProject({project: this.projectForm?.value}));
    this.isCreateModalVisible = false;
  }

  handleCancel(): void {
    this.isCreateModalVisible = false;
    this.isUpdateModalVisible = false;
  }

  showUpdateModal(id: number) {
    this.isUpdateModalVisible = true;
    this.leaders$ = this.store.pipe(select(leaders));
    this.members$ = this.store.pipe(select(members));
    this.store.dispatch(selectProject({id}));
    this.store.pipe(select(selectedProject)).subscribe(p => {
      this.updateProjectForm?.patchValue({
        id: p?.id,
        name: p?.name,
        description: p?.description,
        leaderId: p?.leaderId,
        memberIds: p?.memberIds,
      });
    });
  }

  handleSubmitUpdateProject() {
    const project: Update<Project> = {
      id: this.updateProjectForm?.value.id,
      changes: this.updateProjectForm?.value
    }
    this.store.dispatch(updateProject({project}));
    this.isUpdateModalVisible = false;
  }
}
