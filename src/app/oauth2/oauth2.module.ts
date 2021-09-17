import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountChooserComponent } from './account-chooser/account-chooser.component';
import { IdentifierComponent } from './identifier/identifier.component';
import { OAuth2RoutingModule } from './oauth2-routing.module';
import { OAuth2Component } from './oauth2.component';

@NgModule({
  declarations: [OAuth2Component, IdentifierComponent, AccountChooserComponent],
  imports: [CommonModule, OAuth2RoutingModule, ReactiveFormsModule],
})
export class OAuth2Module {}
