import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  styleUrls: ['./breadcrumb.component.css'],
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: any[] = [];

  constructor(private breadcrumbService: BreadcrumbService ) {}

  ngOnInit(): void {
    this.breadcrumbService.breadcrumbs$.subscribe(crumbs => {
      console.log('Received breadcrumbs:', crumbs); // Ajoutez ce log pour vérifier si les miettes de pain sont correctement reçues
      this.breadcrumbs = crumbs;
    });
  }
}
