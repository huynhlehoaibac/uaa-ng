import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-oauth2',
  templateUrl: './oauth2.component.html',
  styleUrls: ['./oauth2.component.scss'],
})
export class OAuth2Component implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  form: FormGroup = this.fb.group({
    langs: [this.translocoService.getDefaultLang()],
  });

  constructor(
    private fb: FormBuilder,
    private translocoService: TranslocoService
  ) {}

  ngOnInit(): void {
    this.form
      .get('langs')
      ?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
        this.translocoService.setActiveLang(value)
        console.log("A");
      }
      );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
