import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/oauth2/shared/auth.service';
// import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-pwd',
  templateUrl: './pwd.component.html',
  styleUrls: ['./pwd.component.scss'],
})
export class PwdComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  private origin: string = '';
  username: string = '';
  accountlookup: any = {};
  acronym: string = '';

  form = this.fb.group({
    username: [
      null,
      [
        Validators.required,
        Validators.maxLength(255),
        // Validators.pattern(/\S+@\S+/),
      ],
    ],
    password: [null, [Validators.required]],
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cookie: CookieService,
    private jwtHelper: JwtHelperService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.origin = params.origin;
        this.username = params['login_hint'];

        this.form.patchValue({ username: this.username });
      });

    this.route.data.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.accountlookup = data.accountlookup;
      this.acronym = this.shorten(this.accountlookup.firstname);
    });
  }

  choose(code: string) {
    const redirectUri = new URL(decodeURIComponent(this.origin));
    redirectUri.searchParams.set('account_code', code);
    window.location.href = redirectUri.toString();
  }

  showRawPassword(pwdElement: HTMLInputElement, showPwd: boolean) {
    pwdElement.type = showPwd ? 'text' : 'password';
  }

  onSubmit() {
    const formValue = this.form.value;
    this.authService.login(formValue).subscribe(
      (response: HttpResponse<string>) => {
        // Store the cookies
        const accountChooserToken = response.headers.get('Account-Chooser')!;
        this.cookie.set(
          'ACCOUNT_CHOOSER',
          accountChooserToken,
          this.jwtHelper.getTokenExpirationDate(accountChooserToken)!,
          '/'
        );
        const authAccount = response.headers.get('Auth-Account')!.split(' ');
        const code = authAccount[0];
        const accessToken = authAccount[1];
        this.cookie.set(
          code,
          accessToken,
          this.jwtHelper.getTokenExpirationDate(accessToken)!,
          '/'
        );

        this.choose(code);
      },
      (error) => {
        switch (error.status) {
          case 401:
            this.form.get('password')?.setErrors({ badPassword: true });
            break;
          case 422:
          case 404:
          default:
            // this.messageService.add({
            //   severity: 'error',
            //   summary: error.error.error,
            //   detail: error.error.message,
            // });
            break;
        }
      }
    );
  }

  private shorten(text: string): string {
    if (!text) {
      return '@';
    }

    return text
      .match(/\b(\w)/g)!
      .slice(0, 2)
      .map((c) => c.toUpperCase())
      .join('');
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
