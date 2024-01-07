import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private $routeText = new BehaviorSubject<string>('Sign Up');
  private $routeLink = new BehaviorSubject<string>('/authentication');

  public getRouteText() {
    return this.$routeText;
  }

  public getRouteLink() {
    return this.$routeLink;
  }

  constructor(private router: Router) {
    router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event: any) => {
        if (event.url === '/') {
          this.$routeLink.next('/authentication');
          this.$routeText.next('BUTTONS.AUTH');
        } else  {
          this.$routeLink.next('/');
          this.$routeText.next('BUTTONS.MAIN');
        }
      });
  }
}


