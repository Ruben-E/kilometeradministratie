import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SheetsComponent} from "./sheets/sheets.component";
import {RidesComponent} from "./rides/rides.component";

const routes: Routes = [
  { path: '', redirectTo: '/sheets', pathMatch: 'full' },
  { path: 'sheets', component: SheetsComponent },
  { path: 'rides/:id', component: RidesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
