import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { MaterialFileInputModule } from 'ngx-material-file-input';
import {
    MatDatepickerModule, MatSlideToggleModule, MatMenuModule, MatRadioModule,
    MAT_RADIO_DEFAULT_OPTIONS, MatChipsModule, MatTableModule, MatCheckboxModule,
    MatPaginatorModule, MatSortModule, MatFormFieldModule, MatDialogModule,
    MatSelectModule, MatInputModule, MatButtonModule, MatPaginatorIntl, MatBadgeModule, MatTooltipModule
} from '@angular/material';
import { FaMatPaginatorIntl } from './faMatPaginatorIntl';

@NgModule({
    imports: [
        MatCheckboxModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        MatFormFieldModule,
        MaterialFileInputModule,
        MatDatepickerModule,
        MatSlideToggleModule,
        MatMenuModule,
        MatRadioModule,
        MatChipsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatBadgeModule,
        MatTooltipModule
    ],
    exports: [
        MatCheckboxModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        MatFormFieldModule,
        MaterialFileInputModule,
        MatDatepickerModule,
        MatSlideToggleModule,
        MatMenuModule,
        MatRadioModule,
        MatChipsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatBadgeModule,
        MatTooltipModule
    ]
})
export class AccountantMaterialModule { }
