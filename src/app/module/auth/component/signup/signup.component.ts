import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AuthActions} from "../../auth.actions";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private readonly store: Store,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      passwordCheck: [null, [Validators.required]],
      remember: [true]
    });
  }

  signup() {
    this.store.dispatch(AuthActions.signup({username: '', password: '', passwordCheck: ''}))
  }

}
