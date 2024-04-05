// breadcrumb.service.ts

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Data, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  breadcrumbs$ = new BehaviorSubject<Data[]>([]);

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.generateBreadcrumbTrail(this.router.routerState.snapshot.root);
      }
    });
  }

  private generateBreadcrumbTrail(route: ActivatedRouteSnapshot | null, crumbs: Data[] = []) {
    if (!route) return;
    const data = route.data as Data;
    if (data && data['breadcrumb']) {
      crumbs.push(data);
    }
    this.breadcrumbs$.next(crumbs);
    this.generateBreadcrumbTrail(route.firstChild, crumbs);
  }
}
