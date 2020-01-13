import { NgModule } from '@angular/core';

import { MaterialFileInputModule } from 'ngx-material-file-input';
import {
    MatDatepickerModule, MatTableModule, MatCheckboxModule,
    MatPaginatorModule, MatSortModule, MatFormFieldModule,
    MatSelectModule, MatInputModule, MatButtonModule, MatTooltipModule
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
        MatTooltipModule
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
        MatTooltipModule
    ]
})
export class AdminMaterialModule { }
