import { NgModule } from '@angular/core';

import { MaterialFileInputModule } from 'ngx-material-file-input';
import {
    MatDatepickerModule, MatTableModule, MatCheckboxModule,
    MatPaginatorModule, MatSortModule, MatFormFieldModule,
    MatSelectModule, MatInputModule, MatButtonModule, MatTooltipModule, MatSlideToggleModule
} from '@angular/material';

@NgModule({
    imports: [
        MatCheckboxModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        MaterialFileInputModule,
        MatDatepickerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatTooltipModule,
        MatSlideToggleModule
    ],
    exports: [
        MatCheckboxModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        MaterialFileInputModule,
        MatDatepickerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatTooltipModule,
        MatSlideToggleModule
    ]
})
export class AdminMaterialModule { }
