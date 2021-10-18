import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { LayoutModule } from '../layout/layout.module';
import { ChallengeRoutingModule } from './challenge-routing.module';
import { ChallengeComponent } from './challenge.component';
import { PwdComponent } from './pwd/pwd.component';
import { AccountlookupResolver } from './shared/accountlookup.resolver';
import { AccountlookupService } from './shared/lookup.service';

@NgModule({
  declarations: [PwdComponent, ChallengeComponent],
  imports: [
    CommonModule,
    ChallengeRoutingModule,
    LayoutModule,
    TranslocoModule,
    ReactiveFormsModule,
  ],
  providers: [AccountlookupService, AccountlookupResolver],
})
export class ChallengeModule {}
