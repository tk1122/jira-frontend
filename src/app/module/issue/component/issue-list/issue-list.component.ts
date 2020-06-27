import {Component, Input, OnInit} from '@angular/core';
import {Issue, IssueStatus} from "../../../../../shared/model/issue";
import {Router} from "@angular/router";

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit {
  @Input('data')
  issues: Issue[] = [];

  constructor(private readonly router: Router) { }

  panigation: boolean = this.issues.length > 10
  ngOnInit(): void {
  }

  editIssue(id: number) {
    this.router.navigate(['/issues', id]).then()
  }
}
