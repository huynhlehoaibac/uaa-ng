import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { forOwn } from 'lodash';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-account-chooser',
  templateUrl: './account-chooser.component.html',
  styleUrls: ['./account-chooser.component.scss']
})
export class AccountChooserComponent implements OnInit {
  accounts:any[] = [];
  redirectUrl = null;
  clientName = null;
  clientUrl = null;
  origin = '';

  colors = [
    '#33691e', // green
    '#ec407a', // pink
    '#f57f17', // orange
    '#651fff', // purple
    '#53bbb4', // aqua
    '#e64a19', // red
    '#7d669e', // lightpurple
    '#e0ab18', // yellow
    '#01579b' // dark blue
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private cookie: CookieService,
    // private authService: AuthService
  ) {}

  ngOnInit() {
    this.retrieveAccountChooser();

    this.route.queryParams.subscribe(params => {
      this.origin = params.origin;
    });
  }

  choose(code: string) {
    const redirectUri = new URL(decodeURIComponent(this.origin));
    redirectUri.searchParams.set('account_code', code);
    window.location.href = redirectUri.toString();
  }

  logout(code: string) {
    // this.authService.logout(code).subscribe((response: any) => {
    //   this.cookie.set(
    //     'ACCOUNT_CHOOSER',
    //     response.headers.get('Account-Chooser'),
    //     180,
    //     '/'
    //   );
    //   this.cookie.delete(response.headers.get('Remove-Auth-Account'), '/');
//
    //   this.retrieveAccountChooser();
    // });
  }

  private retrieveAccountChooser() {
    const accounts:any[] = [];

    const accountChooser = this.cookie.get('ACCOUNT_CHOOSER');
    if (accountChooser) {
      const decodedAccountChooser = this.jwtHelper.decodeToken(accountChooser);
      forOwn(
        decodedAccountChooser['accounts'],
        (accountDetails: any, code: string) => {
          accountDetails.shortName = this.shorten(
            accountDetails.firstname
          );
          accounts.push({
            code: code,
            accountDetails: accountDetails
          });
        }
      );
    }

    this.accounts = accounts;

    if (this.accounts.length === 0) {
      this.router.navigate(['../identifier'], {
        relativeTo: this.route,
        queryParamsHandling: 'preserve'
      });
    }
  }

  private shorten(text: string): string {
    return text
      .match(/\b(\w)/g)!
      .slice(0, 2)
      .map(c => c.toUpperCase())
      .join('');
  }
}
