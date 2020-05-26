import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {ActivatedRoute} from "@angular/router";
import {tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {User, userGenderOptions, userStatusOptions} from "../../../../../shared/model/user";
import {selectUser, updateUser} from "../../user.actions";
import {Role} from "../../../../../shared/model/role";
import {roles, selectedUser} from "../../user.selectors";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Update} from "@ngrx/entity";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  roles$: Observable<Role[] | undefined> = of()
  userStatusOptions = userStatusOptions;
  userGenderOptions = userGenderOptions;
  userForm: FormGroup;

  constructor(private readonly store: Store, private readonly route: ActivatedRoute, private readonly fb: FormBuilder) {
    this.userForm = this.fb.group({
      id: [''],
      username: [{value: '', disabled: true}, Validators.required],
      fullname: [{value: '', disabled: true}, Validators.required],
      status: ['', Validators.required],
      gender: [{value: '', disabled: true}, Validators.required],
      skill: [''],
      level: [''],
      email: [{value: '', disabled: true}, Validators.required],
      age: [{value: '', disabled: true}, Validators.required],
      roleIds: [[], [Validators.required, Validators.minLength(1)]],
    })
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      tap((params) => {
        this.store.dispatch(selectUser({id: Number(params.get('id'))}))
      }),
    ).subscribe()

    this.store.pipe(select(selectedUser)).subscribe(user => {
      this.userForm.patchValue({
        id: user?.id,
        username: user?.username,
        fullname: user?.fullname,
        status: user?.status,
        gender: user?.gender,
        skill: user?.skill,
        level: user?.level,
        email: user?.email,
        age: user?.age,
        roleIds: user?.roleIds,
      })
    })

    this.roles$ = this.store.pipe(select(roles))
  }

  submitUserForm() {
    for (const i in this.userForm.controls) {
      this.userForm.controls[i].markAsDirty();
      this.userForm.controls[i].updateValueAndValidity();
    }

    if (this.userForm.valid) {
      const user: Update<User> = {
        id: this.userForm.value.id,
        changes: this.userForm.value
      }

      this.store.dispatch(updateUser({user}))
    }
  }
}
