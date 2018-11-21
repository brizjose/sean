import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavComponent } from './nav/nav.component';
import * as fromPlayers from './players';

const routes: Routes = [
  {path: '', redirectTo: 'players', pathMatch: 'full'},
  {path: 'players', component: NavComponent, children: [
    {path: '', component: fromPlayers.HomeComponent},
    {path: 'all', component: fromPlayers.AllComponent},
    {path: 'new', component: fromPlayers.NewComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
