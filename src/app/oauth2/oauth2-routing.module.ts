import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountChooserComponent } from './account-chooser/account-chooser.component';
import { IdentifierComponent } from './identifier/identifier.component';
import { OAuth2Component } from './oauth2.component';

const routes: Routes = [
  {
    path: '',
    component: OAuth2Component,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'choose-account' },
      { path: 'identifier', component: IdentifierComponent },
      { path: 'choose-account', component: AccountChooserComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OAuth2RoutingModule {}
