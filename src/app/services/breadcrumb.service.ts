import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Data, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  breadcrumbs$ = new BehaviorSubject<Data[]>([]);

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const root = this.router.routerState.snapshot.root;
      const breadcrumbs: Data[] = this.generateBreadcrumbTrail(root);
      this.breadcrumbs$.next(breadcrumbs);
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

    // Parcours de tous les enfants de manière récursive
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
}
