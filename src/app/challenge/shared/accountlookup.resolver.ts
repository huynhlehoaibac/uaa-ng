import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { AccountlookupService } from './lookup.service';

@Injectable()
export class AccountlookupResolver implements Resolve<string> {
  constructor(private router: Router, private lookupService: AccountlookupService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<string> {
    return this.lookupService.accountLookup(route.queryParams['login_hint']).pipe(
      catchError((error) => {
        this.router.navigateByUrl('/404');
        return of('');
      })
    );
  }
}
