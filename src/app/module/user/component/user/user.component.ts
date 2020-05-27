import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {loadRoles, loadUsers} from "../../user.actions";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadUsers())
    this.store.dispatch(loadRoles())
  }
}
