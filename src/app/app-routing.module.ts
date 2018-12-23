import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SheetsComponent} from "./sheets/sheets.component";
import {RidesComponent} from "./rides/rides.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  { path: 'rides/:id', component: RidesComponent, canActivate: [AuthGuard] },
  { path: 'home', component: SheetsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
