import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-unauthorized-access',
  templateUrl: './unauthorized-access.component.html',
  styleUrls: ['./unauthorized-access.component.scss']
})
export class UnauthorizedAccessComponent implements OnInit {

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  backHome() {
    this.router.navigateByUrl('/issues').then();
  }
}
