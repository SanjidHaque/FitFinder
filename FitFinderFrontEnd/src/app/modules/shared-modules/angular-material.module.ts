import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatRippleModule} from '@angular/material/core';



@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTabsModule,
    MatSelectModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatListModule,
    MatSidenavModule,
    MatRippleModule
  ],
  exports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTabsModule,
    MatSelectModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatListModule,
    MatSidenavModule,
    MatRippleModule
  ],

  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ]
})
export class AngularMaterialModule { }
