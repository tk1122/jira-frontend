import {Component, Input, OnInit} from '@angular/core';
import {Issue} from "../../../../../shared/model/issue";

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit {
  @Input('data')
  issues: Issue[] = [];

  constructor() { }

  panigation: boolean = this.issues.length > 10
  ngOnInit(): void {
  }

}
