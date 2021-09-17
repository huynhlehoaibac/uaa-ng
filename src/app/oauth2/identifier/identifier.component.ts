import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../common/auth.service';

@Component({
  selector: 'app-identifier',
  templateUrl: './identifier.component.html',
  styleUrls: ['./identifier.component.scss'],
})
export class IdentifierComponent implements OnInit {
  private origin: string = '';

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
    this.route.queryParams.subscribe((params) => {
      this.origin = params.origin;
    });
  }

  choose(code: string) {
    const redirectUri = new URL(decodeURIComponent(this.origin));
    redirectUri.searchParams.set('account_code', code);
    window.location.href = redirectUri.toString();
  }

  onSubmit() {
    // this.authService.abc().subscribe(result => console.log("ABC"));
    const data = this.form.value;
    console.log('Submitted');
    this.authService.login(data).subscribe(
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
}
