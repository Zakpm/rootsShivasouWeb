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
  private maxBreadcrumbs: number = 5; // Nombre maximum de breadcrumbs à conserver
  private currentBreadcrumbs: Data[] = []; // Breadcrumbs actuellement affichés
  private initialBreadcrumbs: Data[] = [
    { breadcrumb: 'Accueil', path: '/' }
  ];


  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const root = this.router.routerState.snapshot.root;
      const newBreadcrumbs: Data[] = this.generateBreadcrumbTrail(root);
      this.breadcrumbs = this.mergeBreadcrumbs(this.initialBreadcrumbs, newBreadcrumbs);
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
    // Trouver le route parent commun entre les breadcrumbs existants et nouveaux
    const commonParentIndex = existingBreadcrumbs.findIndex((crumb, index) => {
      return newBreadcrumbs.every(newCrumb => newCrumb['path'].startsWith(crumb['path']));
    });

    // Si un parent commun est trouvé, conserver uniquement cette partie des breadcrumbs existants
    const merged = commonParentIndex !== -1 ? existingBreadcrumbs.slice(0, commonParentIndex + 1) : [];

    // Ajouter les nouveaux breadcrumbs à la liste fusionnée
    merged.push(...newBreadcrumbs);

    // Limiter le nombre de breadcrumbs à conserver
    if (merged.length > this.maxBreadcrumbs) {
      merged.splice(0, merged.length - this.maxBreadcrumbs);
    }

    // Mettre à jour les breadcrumbs actuellement affichés
    this.currentBreadcrumbs = merged;

    return merged;
  }
}
