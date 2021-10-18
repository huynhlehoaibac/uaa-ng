import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslocoModule } from '@ngneat/transloco';
import { LayoutModule } from '../layout/layout.module';
import { AccountChooserComponent } from './account-chooser/account-chooser.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { IdentifierComponent } from './identifier/identifier.component';
import { OAuth2RoutingModule } from './oauth2-routing.module';
import { OAuth2Component } from './oauth2.component';

@NgModule({
  declarations: [
    OAuth2Component,
    IdentifierComponent,
    AccountChooserComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    OAuth2RoutingModule,
    LayoutModule,
    TranslocoModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
})
export class OAuth2Module {}
