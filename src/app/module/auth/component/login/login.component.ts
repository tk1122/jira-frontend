import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AuthActions} from "../../auth.actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private readonly store: Store) {
  }

  ngOnInit(): void {
  }

  login() {
    this.store.dispatch(AuthActions.login({username: '', password: ''}))
  }
}
