import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class OAuth2Resolver implements Resolve<any> {
  constructor(private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    const redirectUri = new URL(
      'http://auth-server:9000/oauth2/authorize' + window.location.search
    );
    route.queryParams
    return {
      searchParams: redirectUri.searchParams
    };
  }
}
