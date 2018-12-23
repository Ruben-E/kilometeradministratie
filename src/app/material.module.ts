import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {
  MatButtonModule,
  MatNativeDateModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatInputModule, MatTabsModule, MatCardModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatTabsModule,
    MatCardModule,
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatTabsModule,
    MatCardModule,
  ],
})
export class MaterialModule {
}
