import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import {
  Translation, TranslocoConfig, translocoConfig, TranslocoLoader, TranslocoMissingHandler, TranslocoModule, TRANSLOCO_CONFIG, TRANSLOCO_LOADER, TRANSLOCO_MISSING_HANDLER
} from '@ngneat/transloco';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

export class CustomTranslocoMissingHandler implements TranslocoMissingHandler {
  handle(key: string, config: TranslocoConfig) {
    return key;
  }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['vi', 'en'],
        defaultLang: 'vi',
        // Remove this option if your application
        // doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: environment.production,
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
    {
      provide: TRANSLOCO_MISSING_HANDLER,
      useClass: CustomTranslocoMissingHandler
    },
  ],
})
export class TranslocoRootModule {}
