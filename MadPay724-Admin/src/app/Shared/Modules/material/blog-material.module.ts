import { NgModule } from '@angular/core';

import * as Material from '@angular/material';
import { CommonModule } from '@angular/common';

import { MaterialFileInputModule } from 'ngx-material-file-input';
import {
    MatDatepickerModule, MatSlideToggleModule, MatMenuModule, MatRadioModule,
    MAT_RADIO_DEFAULT_OPTIONS, MatChipsModule, MatTableModule, MatCheckboxModule,
    MatPaginatorModule, MatSortModule, MatFormFieldModule, MatDialogModule,
    MatSelectModule, MatInputModule, MatButtonModule, MatPaginatorIntl
} from '@angular/material';
import { FaMatPaginatorIntl } from './FaMatPaginatorIntl';

@NgModule({
    imports: [
        CommonModule,
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
        Material.MatPaginatorModule,
        Material.MatSortModule
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
        MatSortModule
    ], providers: [{
        provide: MAT_RADIO_DEFAULT_OPTIONS,
        useValue: { color: 'warn' },
    },
    {
        provide: MatPaginatorIntl, useClass: FaMatPaginatorIntl
    }]
})
export class BlogMaterialModule { }
