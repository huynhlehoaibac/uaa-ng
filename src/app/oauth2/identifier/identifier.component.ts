import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../shared/auth.service';

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
    private router: Router,
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

  showRawPassword(pwdElement: HTMLInputElement, showPwd: boolean) {
    pwdElement.type = showPwd ? 'text' : 'password';
  }

  onSubmit() {
    const formValue = this.form.value;
    this.router.navigate(['challenge', 'pwd'], {
      queryParams: { login_hint: formValue.username },
      queryParamsHandling: 'merge',
    });
  }
}
