import {Component, Input, OnInit} from '@angular/core';
import {Issue} from "../../../../../shared/model/issue";
import {Router} from "@angular/router";

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit {
  @Input('data')
  issues: Issue[] = [];
  panigation: boolean = this.issues.length > 10

  constructor(private readonly router: Router) {
  }

  ngOnInit(): void {
  }
}
