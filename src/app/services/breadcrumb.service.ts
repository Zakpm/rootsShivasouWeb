import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Data, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbs: Data[] = [];
  breadcrumbs$ = new BehaviorSubject<Data[]>(this.breadcrumbs);

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const root = this.router.routerState.snapshot.root;
      const newBreadcrumbs: Data[] = this.generateBreadcrumbTrail(root);
      this.breadcrumbs = this.mergeBreadcrumbs(this.breadcrumbs, newBreadcrumbs);
      this.breadcrumbs$.next(this.breadcrumbs);
    });
  }

  private generateBreadcrumbTrail(route: ActivatedRouteSnapshot, crumbs: Data[] = []): Data[] {
    const data = route.data as Data;
    if (data && data['breadcrumb']) {
      const breadcrumbData: Data = {
        breadcrumb: data['breadcrumb'],
        path: this.createPath(route)
      };
      crumbs.push(breadcrumbData);
    }

    for (const child of route.children) {
      this.generateBreadcrumbTrail(child, crumbs);
    }

    return crumbs;
  }

  private createPath(route: ActivatedRouteSnapshot): string {
    const segments: string[] = [];
    while (route) {
      if (route.url.length) {
        segments.unshift(...route.url.map((segment: any) => segment.path));
      }
      route = route.parent!;
    }
    return '/' + segments.join('/');
  }

  private mergeBreadcrumbs(existingBreadcrumbs: Data[], newBreadcrumbs: Data[]): Data[] {
    const merged = [...existingBreadcrumbs];
    newBreadcrumbs.forEach(newCrumb => {
      const existingIndex = merged.findIndex(crumb => crumb['path'] === newCrumb['path']);
      if (existingIndex === -1) {
        merged.push(newCrumb);
      } else {
        merged[existingIndex] = newCrumb;
      }
    });
    return merged;
  }
}
