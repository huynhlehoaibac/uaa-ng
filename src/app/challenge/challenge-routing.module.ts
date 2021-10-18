import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallengeComponent } from './challenge.component';
import { PwdComponent } from './pwd/pwd.component';
import { AccountlookupResolver } from './shared/accountlookup.resolver';

const routes: Routes = [
  {
    path: '',
    component: ChallengeComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'pwd' },
      {
        path: 'pwd',
        component: PwdComponent,
        resolve: {
          accountlookup: AccountlookupResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChallengeRoutingModule {}
