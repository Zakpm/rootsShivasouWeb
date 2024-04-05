import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  styleUrls: ['./breadcrumb.component.css'],
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Data[] = [];

  constructor(private breadcrumbService: BreadcrumbService ) {

  }

  ngOnInit(): void {
    this.breadcrumbService.breadcrumbs$.subscribe(crumbs => {
      this.breadcrumbs = crumbs;
    });
  }

}
