import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  form: FormGroup = this.fb.group({
    lang: [null],
  });

  constructor(
    private fb: FormBuilder,
    private translocoService: TranslocoService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    const activeLang =
      this.cookieService.get('lang') || this.translocoService.getDefaultLang();
    this.form.patchValue({
      lang: activeLang,
    });
    this.translocoService.setActiveLang(activeLang);

    this.form
      .get('lang')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.translocoService.setActiveLang(value);
        this.cookieService.set('lang', value);
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
