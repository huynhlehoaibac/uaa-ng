import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { forOwn } from 'lodash';
import { CookieService } from 'ngx-cookie-service';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogModel,
} from '../confirmation-dialog/confirmation-dialog.component';
import { Account, Details } from '../shared/accounts.model';

@Component({
  selector: 'app-account-chooser',
  templateUrl: './account-chooser.component.html',
  styleUrls: ['./account-chooser.component.scss'],
})
export class AccountChooserComponent implements OnInit {
  accounts: Account[] = [];
  redirectUrl = null;
  clientName = null;
  clientUrl = null;
  origin = '';

  removeMode = false;

  colors = [
    '#33691e', // green
    '#ec407a', // pink
    '#f57f17', // orange
    '#651fff', // purple
    '#53bbb4', // aqua
    '#e64a19', // red
    '#7d669e', // lightpurple
    '#e0ab18', // yellow
    '#01579b', // dark blue
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private cookie: CookieService, // private authService: AuthService
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.retrieveAccountChooser();

    this.route.queryParams.subscribe((params) => {
      this.origin = params.origin;
    });
  }

  useAccount(account: Account) {
    const redirectUri = new URL(decodeURIComponent(this.origin));
    redirectUri.searchParams.set('account_code', account.code);
    window.location.href = redirectUri.toString();
  }

  removeAccount(account: Account) {
    const dialogData: ConfirmationDialogModel = {
      title: 'Remove account?',
      message: `[ ${account.details.username} ] will no longer be used with UAA services on this browser. Sign in when you’re ready to use your account again.`,
      confirm: 'Yes, remove',
      cancel: 'Cancel'
    };

    this.dialog
      .open(ConfirmationDialogComponent, { data: dialogData })
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.cookie.delete(account.code, '/');
          this.retrieveAccountChooser();
        }
      });
  }

  private retrieveAccountChooser() {
    const accounts: Account[] = [];

    const accountChooser = this.cookie.get('ACCOUNT_CHOOSER');
    if (accountChooser) {
      const decodedAccountChooser = this.jwtHelper.decodeToken(accountChooser);
      forOwn(
        decodedAccountChooser['accounts'],
        (details: Details, code: string) => {
          if (this.cookie.get(code)) {
            details.acronym = this.shorten(details.firstname);
            accounts.push({
              code: code,
              details: details,
            });
          }
        }
      );
    }

    this.accounts = accounts;

    if (this.accounts.length === 0) {
      this.router.navigate(['../identifier'], {
        relativeTo: this.route,
        queryParamsHandling: 'preserve',
      });
    }
  }

  private shorten(text: string): string {
    return text
      .match(/\b(\w)/g)!
      .slice(0, 2)
      .map((c) => c.toUpperCase())
      .join('');
  }
}
